import { UserManagementService } from './../services/user-management.service';
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
} from '@loopback/rest';
import {enquiry} from '../models';
import {EmployeeRepository, enquiryRepository, UserRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {NewCommentsRequest} from '../models/enquiry-comment.model';
import {EmailJSConst} from '../services/constant';
import { UserServiceBindings } from '@loopback/authentication-jwt';

export class enquiryController {

  constructor(
    @inject(UserServiceBindings.USER_SERVICE)
    public userManagementService: UserManagementService,   
     @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
    @repository(enquiryRepository)
    public enquiryRepository: enquiryRepository,
  ) {}

  @authenticate('jwt')
  @post('enquiry')
  @response(200, {
    description: 'enquiry model instance',
    content: {'application/json': {schema: getModelSchemaRef(enquiry)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(enquiry, {
            title: 'Newenquiry',
            exclude: ['id'],
          }),
        },
      },
    })
    enquiry: Omit<enquiry, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<enquiry> {
    enquiry.enquiryDate = new Date().toISOString();
    if (enquiry.emailQuotation) {
      let emailObj = {
        templateId: EmailJSConst.QUOTATION_TEMPLATE,
        name: enquiry?.name,
        noOfPerson: enquiry?.numberOfPeople,
        price: enquiry?.venuePrice,
        total: (enquiry.numberOfPeople ?? 1) * (enquiry.venuePrice ?? 1),
        toEmail: enquiry?.emailId,
        venue:enquiry?.venueName,
        // venueDetailsLink: enquiry?.venueDetailsLink,
      };

      const emailResp = await this.userManagementService.sendEmail(emailObj);
      if (emailResp) {
        enquiry['isQuotationSent'] = true;
      }
    } 
    let date = enquiry.bookingDate;
    if(date){
      enquiry.from_day = parseInt(date.split('-')[2])
      enquiry.from_month = parseInt(date.split('-')[1])
      enquiry.from_year = parseInt(date.split('-')[0])
    }
    const userId = currentUserProfile[securityId];
    enquiry.userId = userId;
    return this.enquiryRepository.create(enquiry);
  }

  @get('enquiry/count')
  @response(200, {
    description: 'enquiry model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(enquiry) where?: Where<enquiry>): Promise<Count> {
    return this.enquiryRepository.count(where);
  }

  @get('enquiry')
  @response(200, {
    description: 'Array of enquiry model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(enquiry, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.filter(enquiry) filter?: Filter<enquiry>,
  ): Promise<enquiry[]> {
    //Add the vendor into filter
    if (!filter) {
      filter = {};
    }
    filter = await this.userRepository.addVendorFilter(
      filter,
      currentUserProfile,
    );
    // End if add vendor into filter

    return this.enquiryRepository.find(filter);
  }

  
  @get('customer-enquiries/{status}')
  @response(200, {
    description: 'Array of enquiry model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(enquiry, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async findMyEnquiry(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.string('status') status: number = 0,
    @param.filter(enquiry) filter?: Filter<any>,
  ): Promise<enquiry[]> {
    //Add the vendor into filter
    const userId = currentUserProfile[securityId];
    if (!filter) {
      filter = {};
    }
    let statusFilter = {'status':status};
    let userFilter = {userId};
    let tempFilter = [] 
    tempFilter.push(statusFilter);
    tempFilter.push(userFilter)
    filter = {where:{and:tempFilter}}
    return this.enquiryRepository.find(filter);
  }


  @get('manager-enquiries/{status}')
  @response(200, {
    description: 'Array of enquiry model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(enquiry, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async findMyEnquiryVendor(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.string('status') status: number = 0,
    @param.filter(enquiry) filter?: Filter<any>,
  ): Promise<enquiry[]> {
    //Add the vendor into filter
    const userId = currentUserProfile[securityId];

    let employees = await this.employeeRepository.find({where:{userId}})
    let venuesId: string | any[] = [];
    if(employees.length){
      venuesId = employees[0]['assignedVenueIds'] || [];
    }
    if (!filter) {
      filter = {};
    }
    let statusFilter = {'status':status};
    let tempFilter = [] 
    tempFilter.push(statusFilter);
    for(let i=0; i< venuesId.length;i++){
      tempFilter.push({venueId:venuesId[i]});
    }
    filter = {where:{and:tempFilter}}
    if(venuesId.length > 0){
      return this.enquiryRepository.find(filter);
    }
    return []
  }



  @authenticate('jwt')
  @patch('enquiry')
  @response(200, {
    description: 'enquiry PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(enquiry, {partial: true}),
        },
      },
    })
    enquiry: enquiry,
    @param.where(enquiry) where?: Where<enquiry>,
  ): Promise<Count> {
    return this.enquiryRepository.updateAll(enquiry, where);
  }

  @get('enquiry/{id}')
  @response(200, {
    description: 'enquiry model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(enquiry, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(enquiry, {exclude: 'where'})
    filter?: FilterExcludingWhere<enquiry>,
  ): Promise<enquiry> {
    return this.enquiryRepository.findById(id, filter);
  }

  @patch('enquiry/{id}')
  @response(204, {
    description: 'enquiry PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(enquiry, {partial: true}),
        },
      },
    })
    enquiry: enquiry,
  ): Promise<void> {
    await this.enquiryRepository.updateById(id, enquiry);
  }

  @put('enquiry/{id}')
  @response(204, {
    description: 'enquiry PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() enquiry: enquiry,
  ): Promise<void> {
    await this.enquiryRepository.replaceById(id, enquiry);
  }

  @del('enquiry/{id}')
  @response(204, {
    description: 'enquiry DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.enquiryRepository.deleteById(id);
  }

  @post('/enquiry/comment/{id}', {
    responses: {
      '200': {
        description: 'equiry comments',
        content: {'application/json': {schema: getModelSchemaRef(enquiry)}},
      },
    },
  })
  @authenticate('jwt')
  async sendComments(
    @param.path.string('id') id: string,
    @requestBody({})
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    enquiry: NewCommentsRequest,
  ): Promise<object> {
    let enquiryRes = await this.enquiryRepository.findById(id);
    var ts = Date.now();
    var m = new Date(ts);
    var dateString =
      m.getFullYear() +
      '/' +
      (m.getMonth() + 1) +
      '/' +
      m.getDate() +
      ' ' +
      m.getHours() +
      ':' +
      m.getMinutes() +
      ':' +
      m.getSeconds();
    const userId = currentUserProfile[securityId];
    let commentsObj = {
      message: enquiry.message,
      date: dateString,
      commentBy: userId,
    };
    if (!enquiryRes.comments) {
      enquiryRes.comments = [];
    }
    enquiryRes.comments.push(commentsObj);
    let updatedEnquiry = await this.enquiryRepository.update(enquiryRes);
    return commentsObj;
  }
}
