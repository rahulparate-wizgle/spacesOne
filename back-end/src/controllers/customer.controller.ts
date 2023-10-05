import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  RestBindings,
  HttpErrors,
  Request,
  Response,
} from '@loopback/rest';
import {Customer, UserWithPassword, CustomerEmail} from '../models';
import {CustomerRepository, UserRepository} from '../repositories';
import {EmailJSConst} from '../services/constant';
import {UserManagementService} from '../services';
import {UserServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {authenticate} from '@loopback/authentication';
import multer from 'multer';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
const upload = multer({dest: 'uploads/'});
const {uploadFile, deleteFile, awsS3BaseUrl} = require('../providers/awss3/s3');

export class CustomerController {
  userwithPassword: UserWithPassword = new UserWithPassword();
  constructor(
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(UserServiceBindings.USER_SERVICE)
    public userManagementService: UserManagementService,
  ) {}

  @post('/customers')
  @response(200, {
    description: 'Customer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Customer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {
            title: 'NewCustomer',
            exclude: ['id'],
          }),
        },
      },
    })
    customer: Omit<Customer, 'id'>,
  ): Promise<Object> {
    let password = customer.password;
    if (customer.email && password) {
      this.userwithPassword['name'] = customer.name;
      this.userwithPassword['username'] = customer.email;
      this.userwithPassword['password'] = password;
      this.userwithPassword['roles'] = ['customer'];
      let emailObj = {
        templateId: EmailJSConst.SIGN_UP_TEMPLATE,
        username: customer?.email,
        currentUser: customer?.name,
        toEmail: customer?.email,
        message:
          'You have been successfully registered from this ' +
          customer?.email +
          " email Id,  If you didn't request this, you can ignore this email or let us know.",
        message2:
          "We're delighted to welcome you to Venues.One! Thank you for choosing us for your needs. This is the start of an exciting journey, and we're gratified to have you onboard",
        subject: 'Venues.One | Registeration Successful',
      };
      const emailResp = await this.userManagementService.sendEmail(emailObj);
      if (emailResp) {
        customer.isEmailSent = true;
      }
      const user = await this.userManagementService.createUser(
        this.userwithPassword,
      );
      if (user) {
        customer.userId = user.id;
        delete customer.password;
        delete customer.confirmpwd;
      }
    }
    return this.customerRepository.create(customer);
  }

  @get('/customers/count')
  @response(200, {
    description: 'Customer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Customer) where?: Where<Customer>): Promise<Count> {
    return this.customerRepository.count(where);
  }

  @get('/customers')
  @response(200, {
    description: 'Array of Customer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Customer) filter?: Filter<Customer>,
  ): Promise<Customer[]> {
    return this.customerRepository.find(filter);
  }

  @patch('/customers')
  @response(200, {
    description: 'Customer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {partial: true}),
        },
      },
    })
    customer: Customer,
    @param.where(Customer) where?: Where<Customer>,
  ): Promise<Count> {
    return this.customerRepository.updateAll(customer, where);
  }

  @get('/customers/{id}')
  @response(200, {
    description: 'Customer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Customer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Customer, {exclude: 'where'})
    filter?: FilterExcludingWhere<Customer>,
  ): Promise<Customer> {
    return this.customerRepository.findById(id, filter);
  }

  @patch('/customers/{id}')
  @response(204, {
    description: 'Customer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {partial: true}),
        },
      },
    })
    customer: Customer,
  ): Promise<void> {
    await this.customerRepository.updateById(id, customer);
  }

  @put('/customers/{id}')
  @response(204, {
    description: 'Customer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() customer: Customer,
  ): Promise<void> {
    await this.customerRepository.replaceById(id, customer);
  }

  @del('/customers/{id}')
  @response(204, {
    description: 'Customer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customerRepository.deleteById(id);
  }

  @get('/verify-customer/{email}', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Customer),
          },
        },
      },
    },
  })
  async findByEmail(@param.path.string('email') email: string): Promise<any> {
    let filter: any = {where: {email}};

    let customer = await this.customerRepository.find(filter);
    return customer.length > 0;
  }

  @post('/customers/generate-otp', {
    responses: {
      200: {
        content: {
          'application/json': {},
        },
        description: '',
      },
    },
  })
  async generateOtp(
    @requestBody({})
    cust: CustomerEmail,
  ): Promise<object> {
    const custRes = await this.customerRepository.findOne({
      where: {email: cust.email},
    });
    let customer: any = custRes;
    // const employee  = await this.employeeRepository.findById(id)
    delete customer.otp;
    delete customer.otpGeneratedAt;
    try {
      let otp = Math.floor(1000 + Math.random() * 9000);
      let emailObj = {
        templateId: EmailJSConst.SIGN_UP_TEMPLATE,
        currentUser: customer?.name,
        toEmail: customer?.email,
        message:
          'Please use the verification code below on the Venue website: ' +
          otp +
          "  If you didn't request this, you can ignore this mail or let us know.",
        subject: 'Venues.One | Verification Code',
      };

      const emailResp = await this.userManagementService.sendEmail(emailObj);
      if (emailResp) {
        customer.isOtpSent = true;
        customer.otp = otp;
        customer.otpGeneratedAt = new Date().toISOString();
        let updateCustomer = await this.customerRepository.update(customer);

        return {email: customer.email, success: true};
      }
    } catch (error) {}
    return {success: false};
  }

  @post('/customers/verify-otp/{email}', {
    responses: {
      200: {
        content: {
          'application/json': {},
        },
        description: '',
      },
    },
  })
  async verifyOtp(
    @param.path.string('email') email: string,
    @requestBody()
    otp: number,
  ): Promise<object> {
    try {
      const custRes = await this.customerRepository.findOne({
        where: {email: email},
      });

      const customer: any = custRes;
      let currentTime = new Date();
      let otpGeneratedTime = new Date(customer.otpGeneratedAt);
      let timeDiff =
        (currentTime.getTime() - otpGeneratedTime?.getTime()) / 1000;
      timeDiff /= 60;
      timeDiff = Math.abs(Math.round(timeDiff));
      if (timeDiff <= 5) {
        if (otp == customer.otp) {
          customer['isEmailVerify'] = true;
          delete customer.otp;
          let updateCustomer = await this.customerRepository.update(customer);

          return {message: 'Otp Verified', email: email, success: true};
        } else {
          return {message: 'Invalid OTP', success: false};
        }
      } else {
        return {message: 'Otp Expired', success: false};
      }
    } catch (error) {}
    return {success: false};
  }

  // @post('/user/update-password/{email}', {
  //   responses: {
  //     200: {
  //       content: {
  //         'application/json': {
  //            },
  //       },
  //       description: '',
  //     },
  //   },
  // })
  // async updatePassword(
  //   @param.path.string('email') email: string,
  //   @requestBody()
  //   pwdObj: any,
  // ): Promise<object> {
  //   try{
  //   const userRes  = await this.userRepository.findOne({where:{username:email}})
  //   let user: any = userRes;
  //   const updatedUser = await this.userManagementService.updatePassword(user.id,pwdObj.password)
  //   return {'success':true};
  //   }catch (error) {
  //  }
  //   return {'success':false};
  // }

  @authenticate('jwt')
  @post('/customers/image/{id}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: '',
      },
    },
  })
  async upload(
    @requestBody.file()
    request: Request,
    @param.path.string('id') id: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {
      upload.single('file')(request, response, async (err: any) => {
        if (err) reject(err);
        else {
          if (request.file == undefined) {
            throw new HttpErrors[422]('Please select file to upload.');
          }

          let vendorId = await this.userRepository.getVendorId(
            currentUserProfile[securityId],
          );

          const files = request.file;
          const result = await uploadFile(
            files,
            'customers/' + vendorId + '/' + id + '/',
          );
          let customer = await this.customerRepository.findById(id);
          if (customer.image) {
            let key = customer.image.replace(awsS3BaseUrl, '');
            let removeImage = deleteFile(key);
          }
          customer.image = result.url;
          let updatedVenue = await this.customerRepository.update(customer);
          resolve(result);
          return result;
        }
      });
    });
  }

  @post('/generate-otp', {
    responses: {
      200: {
        content: {
          'application/json': {},
        },
        description: '',
      },
    },
  })
  async generateOTP(
    @requestBody(Customer)
    cus: Customer,
  ): Promise<object> {
    try {
      //Step 1: Create customer if not exists
      let existingCustomer = await this.customerRepository.findOne({
        where: {email: cus.email},
      });
      if (!existingCustomer) {
        existingCustomer = await this.customerRepository.create(cus);
      }

      //Step 2: Send Otp
      let otp = Math.floor(1000 + Math.random() * 9000);
      let emailObj = {
        templateId: EmailJSConst.SIGN_UP_TEMPLATE,
        otp: otp,
        currentUser: cus?.name,
        toEmail: cus?.email,
        message:
          'Please use the verification code below on the Venue website: ' +
          otp +
          "  If you didn't request this, you can ignore this mail or let us know.",
        subject: 'Venues.One | Verification Code',
      };
      await this.userManagementService.sendEmail(emailObj);
      existingCustomer.otp = otp;
      existingCustomer.otpGeneratedAt = new Date().toISOString();

      //step 3:Update customer with Otp details
      await this.customerRepository.update(existingCustomer);
      return {email: existingCustomer.email, success: true};
    } catch (error) {}
    return {success: false};
  }

  @post('/verify-otp/{email}', {
    responses: {
      200: {
        content: {
          'application/json': {},
        },
        description: '',
      },
    },
  })
  async verifyOTP(
    @param.path.string('email') email: string,
    @requestBody()
    otp: number,
  ): Promise<object> {
    try {
      const custRes = await this.customerRepository.findOne({
        where: {email: email},
      });
      const customer: any = custRes;
      let currentTime = new Date();
      let otpGeneratedTime = new Date(customer.otpGeneratedAt);
      let timeDiff =
        (currentTime.getTime() - otpGeneratedTime?.getTime()) / 1000;
      timeDiff /= 60;
      timeDiff = Math.abs(Math.round(timeDiff));
      if (timeDiff <= 5) {
        if (otp == customer.otp) {
          customer['isEmailVerify'] = true;
          delete customer.otp;
          let userwithPassword = new UserWithPassword();
          if (customer.email && customer.password) {
            userwithPassword['firstName'] = customer.name;
            userwithPassword['username'] = customer.email;
            userwithPassword['password'] = customer.password;
            userwithPassword['roles'] = ['customer'];
            const user = await this.userManagementService.createUser(
              userwithPassword,
            );
            if (user) {
              customer.userId = user.id;
            }
            let updateCustomer = await this.customerRepository.update(customer);
          }
          return {message: 'Otp Verified', email: email, success: true};
        } else {
          return {message: 'Invalid OTP', success: false};
        }
      } else {
        return {message: 'Otp Expired', success: false};
      }
    } catch (error) {}
    return {success: false};
  }
}
