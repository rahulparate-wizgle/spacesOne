import { EmailJSConst } from './../services/constant';
import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import AuthACL from '../config/auth/AuthACL';
import {PasswordHasherBindings, UserServiceBindings} from '../keys';
import {Employee, EmployeeEmail, User, UserWithPassword, Vendors} from '../models';
import {Credentials, CustomerRepository, EmployeeRepository, UserRepository, VendorsRepository} from '../repositories';
import {
  basicAuthorization,
  PasswordHasher,
  UserManagementService,
  validateCredentials,
} from '../services';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';
import {
  CredentialsRequestBody,
  UserProfileSchema,
} from './specs/user-controller.specs';
import emailjs from '@emailjs/nodejs';
// import { ObjectId } from 'mongodb';

const AuthorizeAcl = new AuthACL({
  resource_name: 'User',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

@model()
export class OnBoarding {
 
  @property({
    type: 'object',
    required: true,
  })
  employee: Employee;
  @property({
    type: 'object',
    required: true,
  })
  vendor: Vendors;
  @property({
    type: 'object',
 
  })
  manager: Vendors;
}



export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @inject(UserServiceBindings.USER_SERVICE)
    public userManagementService: UserManagementService,
    @repository(VendorsRepository)
    public vendorsRepository : VendorsRepository,
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
  ) {}

  @post('/users', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    // All new users have the "admin" role by default
    //newUserRequest.roles = ['admin'];
    // ensure a valid username value and password value
    validateCredentials(_.pick(newUserRequest, ['username', 'password']));

    try {
      return await this.userManagementService.createUser(newUserRequest);
    } catch (error:any) {
      // MongoError 11000 duplicate key
      if (
        error.code === 11000 &&
        error.errmsg.includes('index: uniqueUsername')
      ) {
        throw new HttpErrors.Conflict('Username is already taken');
      } else {
        throw error;
      }
    }
  }

  
  @put('/users/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  // @authorize(ACL_PROJECT['update'])
  async set(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.string('userId') userId: string,
    @requestBody({description: 'update user'}) user: User,
  ): Promise<void> {
    try {
      // Only admin can assign roles
      if (!currentUserProfile.roles.includes('admin')) {
        delete user.roles;
      }
      return await this.userRepository.updateById(userId, user);
    } catch (e) {
      
    }
  }

  @get('/users/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  // @authorize(ACL_PROJECT['view'])
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }


  @get('/users/me', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
   @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {
    // (@jannyHou)FIXME: explore a way to generate OpenAPI schema
    // for symbol property

    const userId = currentUserProfile[securityId];
    return this.userRepository.findById(userId);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
                profile:{
                  type: 'object',
                }
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string,profile: any}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    
    // const employee  = await this.employeeRepository.findOne({where:{userId:user.id}})
    // let response ={profile:employee,token} ;
    // return response;

    var profile;
    if (userProfile.roles[0] == 'employee') {
      const employee = await this.employeeRepository.find({where:{userId:user.id}});
      profile = employee[0];
    }
    else if(userProfile.roles[0] == 'customer')
    {
    const customer  = await this.customerRepository.find({where:{userId:user.id}});
    profile = customer[0]
    }
    else {
      // profile = null;
      const employee = await this.employeeRepository.find({where:{userId:user.id}});
      profile = employee[0];
    }

    const response = { profile: profile, token };
    return response;
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  // @authorize(ACL_PROJECT['view-all'])
  async findUsers(): Promise<User[] | undefined> {
    const users = await this.userRepository.findUsers();
  
    return users;
  }


  @post('/vendor/onboard', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': OnBoarding,
            },
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  async createOnboard(
    @requestBody({
     
    })
    newUserRequest: OnBoarding,
  ): Promise<object> {
    try {
      let employee = newUserRequest.employee;
      let userwithPassword = new UserWithPassword();
      //--Step 1 : Create User
      if (employee.email && employee.password) {
        userwithPassword['firstName'] = employee.name;
        userwithPassword['username'] = employee.email;
        userwithPassword['password'] = employee.password || employee.email;
        if(employee.designation?.length > 0){
          userwithPassword['roles'] = [
            employee.designation
          ];
        }else{
          userwithPassword['roles'] = [
            'vendor',
          ];
        }
       const user = await this.userManagementService.createUser(userwithPassword);
        if (user) {
          employee.userId = (user).id;
        }
        let otp = Math.floor(1000 + Math.random() * 9000);
        let emailObj = {
          templateId : EmailJSConst.SIGN_UP_TEMPLATE,
          currentUser: employee?.name,
          toEmail: employee?.email,
          message:"Please use the verification code below on the Venue website: "+otp+"  If you didn't request this, you can ignore this mail or let us know.",
          subject:"Wtfares Venue | Verification Code"
        }
           
        
        //Step 2 : Create Vendor
        let vendorResponse = await this.vendorsRepository.create(newUserRequest.vendor);
        let vendorId = vendorResponse.id
        employee['vendorId'] = vendorId || "";
        //Step 3: Create Employee
        if(!employee.designation){
          employee.designation = 'vendor';
        }
        delete employee.password;
        
        //Step 4: Update user with vendor id
        user.vendorId= vendorId || "";
        let updatedUser = await this.userRepository.updateById(employee.userId, user);  
        let employeeResponse = await this.employeeRepository.create(employee);
        //Step 5: Send email for otp
        const emailResp = (await this.userManagementService.sendEmail(emailObj))
        
        if(emailResp)
        {
          employeeResponse.isOtpSent = true
          employeeResponse.otp = otp;
          employeeResponse.otpGeneratedAt = new Date().toISOString();
        //Step 6: If successfully email send then update employee
          let updateEmployee = (await this.employeeRepository.update(employeeResponse))
          return {'email':employeeResponse.email, 'success':true};
        }

      }  
     } catch (error) {
    }
    return {'success':false};
  }


  @post('/user/generate-otp', {
    responses: {
      200: {
        content: {
          'application/json': {
             },
        },
        description: '',
      },
    },
  })
  async generateOtp(
    @requestBody({ })   
    emp: EmployeeEmail
  ): Promise<object> {
    const empRes  = await this.employeeRepository.findOne({where:{email:emp.email}})
    let employee: any = empRes;
    // const employee  = await this.employeeRepository.findById(id)
    delete employee.otp;
    delete employee.otpGeneratedAt ;
    try{
    let otp = Math.floor(1000 + Math.random() * 9000);
    let emailObj = {
      templateId : EmailJSConst.SIGN_UP_TEMPLATE,
      currentUser: employee?.name,
      toEmail: employee?.email,
      message:"Please use the verification code below on the Venue website: "+otp+"  If you didn't request this, you can ignore this mail or let us know.",
      subject:"Wtfares Venue | Verification Code"
    }
  
    const emailResp = (await this.userManagementService.sendEmail(emailObj))
    if(emailResp)
    {
      employee.isOtpSent = true
      employee.otp = otp;
      employee.otpGeneratedAt = new Date().toISOString();
      let updateEmployee = (await this.employeeRepository.update(employee))
   
    return {'email':employee.email, 'success':true};
    }
   }catch (error) {
   }
    return {'success':false};
  }

  @post('/user/verify-otp/{email}', {
    responses: {
      200: {
        content: {
          'application/json': {
             },
        },
        description: '',
      },
    },
  })
  async verifyOtp(
    @param.path.string('email') email: string,
    @requestBody()   
    otp: number
    ): Promise<object> {
    try{
    const empRes  = await this.employeeRepository.findOne({where:{email:email}})

    const employee:any  = empRes;
    let currentTime = new Date()
    let otpGeneratedTime = new Date(employee.otpGeneratedAt);
    let timeDiff =(currentTime.getTime() - otpGeneratedTime?.getTime()) / 1000;
    timeDiff /= 60;
    timeDiff =  Math.abs(Math.round(timeDiff));
    if(timeDiff <= 5 ){
    if(otp == employee.otp)
    {
      employee['isEmailVerify'] = true;
      delete employee.otp;
      let updateEmployee = (await this.employeeRepository.update(employee))
   
    return {message:'Otp Verified',email: email,success: true};
    }
   
  }
  else
  {
    return {message:'Otp Expired','success': false};
  }
}catch (error) {
   }
   return {'success': false};
  }

  @post('/user/update-password/{email}', {
    responses: {
      200: {
        content: {
          'application/json': {
             },
        },
        description: '',
      },
    },
  })
  async updatePassword(
    @param.path.string('email') email: string,
    @requestBody()   
    pwdObj: any,
  ): Promise<object> {
    try{
    const userRes  = await this.userRepository.findOne({where:{username:email}})
    let user: any = userRes;
    const updatedUser = await this.userManagementService.updatePassword(user.id,pwdObj.password)
    return {'success':true};
    }catch (error) {
   }
    return {'success':false};
  }

  @post('/user/verify-login', {
    responses: {
      200: {
        content: {
          'application/json': {},
        },
        description: '',
      },
    },
  })
  async verifyLogin(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              password: { type: 'string' },
            },
            required: ['email', 'password'],
          },
        },
      },
    })
    loginData: { email: string; password: string }
  ): Promise<object> {
    try {
      const { email, password } = loginData;
      const user = await this.userRepository.findOne({ where: { username:email } });
      if (!user) {
        return { message: 'User not found', success: false };
      }
      const passwordMatched = await this.userManagementService.verifyPassword( user.id , password)
  
      if ( !passwordMatched) {
        return { message: 'Invalid password', success: false };
      }
      return { message: 'Password match', success: true };
    } catch (error) {
      return { message: 'Error verifying login', success: false };
    }
  }
}

