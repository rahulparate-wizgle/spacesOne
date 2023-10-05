import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  Request,
  Response,
  RestBindings,
} from '@loopback/rest';
import AuthACL from '../config/auth/AuthACL';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {UserServiceBindings} from '../keys';
import {Employee, UserWithPassword} from '../models';
import {EmployeeRepository, UserRepository} from '../repositories';
import {UserManagementService} from '../services';
import multer from 'multer';
const upload = multer({dest: 'uploads/'});
const {uploadFile,deleteFile,awsS3BaseUrl} = require('../providers/awss3/s3');
const AuthorizeAcl = new AuthACL({
  resource_name: 'Employees',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();

export class EmployeeController {
  userwithPassword: UserWithPassword = new UserWithPassword();
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(UserServiceBindings.USER_SERVICE)
    public userManagementService: UserManagementService,
  ) {}

  @post('/employees', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['create'])
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployee',
            exclude: ['id'],
          }),
        },
      },
    })
    employee: Omit<Employee, 'id'>, 
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<Employee> {
    if (employee.email) {
      this.userwithPassword['firstName'] = employee.name;
      this.userwithPassword['username'] = employee.email;
      this.userwithPassword['password'] = employee.password || employee.email;
      this.userwithPassword['roles'] = [
       'employee',
      ];
      const userId = currentUserProfile[securityId];
      let vendorId= await this.userRepository.getVendorId(userId)
      this.userwithPassword.vendorId = vendorId;
      const user = await this.userManagementService.createUser(this.userwithPassword);
      if (user) {
        employee.userId = (user).id;
        employee.vendorId = vendorId ?? user.vendorId ?? "";
      }
    }
    return this.employeeRepository.create(employee);
  }

  @get('/employees/count', {
    responses: {
      '200': {
        description: 'Employee model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['count'])
  async count(@param.where(Employee) where?: Where<Employee>): Promise<Count> {
    return this.employeeRepository.count(where);
  }

  @get('/employees', {
    responses: {
      '200': {
        description: 'Array of Employee model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Employee, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['view-all'])
  async find(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.filter(Employee) filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    //Add the vendor into filter
    if(!filter){ 
      filter = {};
    }
    filter = await this.userRepository.addVendorFilter(filter,currentUserProfile);
    // End if add vendor into filter
    return this.employeeRepository.find(filter);
  }

  @patch('/employees', {
    responses: {
      '200': {
        description: 'Employee PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['bulk-update'])
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Count> {
   if(!employee.vendorId){
    employee.vendorId =  await this.userRepository.getVendorId(currentUserProfile[securityId]);
   }
    return this.employeeRepository.updateAll(employee, where);
  }

  @get('/employees/{id}', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Employee, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['view'])
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Employee, {exclude: 'where'})
    filter?: FilterExcludingWhere<Employee>,
  ): Promise<Employee> {
    return this.employeeRepository.findById(id, filter);
  }

  @get('/verify-employees/{email}', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Employee),
          },
        },
      },
    },
  })
  async findByEmail(
   @param.path.string('email') email: string,
  ): Promise<any> {
    let filter: any = {'where':{email}}
    
    let employee = await this.employeeRepository.find(filter);
   return employee.length > 0 
 }

  @patch('/employees/{id}', {
    responses: {
      '204': {
        description: 'Employee PATCH success',
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['update-field'])
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    if(!employee.vendorId){
      employee.vendorId = await this.userRepository.getVendorId(currentUserProfile[securityId]);
    }
    await this.employeeRepository.updateById(id, employee);
  }

  @put('/employees/{id}', {
    responses: {
      '204': {
        description: 'Employee PUT success',
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['update'])
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() employee: Employee,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    if(!employee.vendorId){
      employee.vendorId = await this.userRepository.getVendorId(currentUserProfile[securityId]);
    }
    await this.employeeRepository.replaceById(id, employee);
  }

  @del('/employees/{id}', {
    responses: {
      '204': {
        description: 'Employee DELETE success',
      },
    }
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['delete'])
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.employeeRepository.deleteById(id);
  }

  
  @authenticate('jwt')
  @post('/employees/updateImage/{id}', {
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
          const result = await uploadFile(files, 'users/'+vendorId+'/'+id+'/');
          let employee = await this.employeeRepository.findById(id);
          if (employee.image) {
            let key = employee.image.replace(awsS3BaseUrl,'')
            let removeImage = deleteFile(key)
          }
          employee.image = result.url;
          let updatedVenue = await this.employeeRepository.update(employee);
          resolve(result);
          return result;
        }
      });
    });
  }

}
