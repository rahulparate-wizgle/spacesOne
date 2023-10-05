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
  Request,
  RestBindings,
  Response,
  HttpErrors
} from '@loopback/rest';
import { Employee, VenueMaster } from '../models';
import { EmployeeRepository, UserRepository, VenueMasterRepository } from '../repositories';
import { inject } from '@loopback/core';
// import {FILE_UPLOAD_SERVICE} from '../keys';
// import {FileUploadHandler} from '../types';
import { allowedVenueEntities } from '../utils/constants';
import { authenticate } from '@loopback/authentication';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
const { uploadFile, deleteFile, awsS3BaseUrl } = require('../providers/awss3/s3');
export class VenueMasterController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(VenueMasterRepository)
    public venueMasterRepository: VenueMasterRepository,
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) // @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
  { }

  @authenticate('jwt')
  @post('/venues')
  @response(200, {
    description: 'VenueMaster model instance',
    content: { 'application/json': { schema: getModelSchemaRef(VenueMaster) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VenueMaster, {
            title: 'NewVenueMaster',
            exclude: ['id'],
          }),
        },
      },
    })
    venueMaster: Omit<VenueMaster, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<VenueMaster> {
    const userId = currentUserProfile[securityId];
    venueMaster.vendorId = await this.userRepository.getVendorId(userId);
    venueMaster.createdBy = userId;
    return this.venueMasterRepository.create(venueMaster);
  }

  //@authenticate('jwt')
  @get('/venues/count')
  @response(200, {
    description: 'VenueMaster model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(VenueMaster) where?: Where<VenueMaster>,
  ): Promise<Count> {
    return this.venueMasterRepository.count(where);
  }

  @authenticate('jwt')
  @get('/vendor-venue')
  @response(200, {
    description: 'Array of VenueMaster model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VenueMaster, { includeRelations: true }),
        },
      },
    },
  })

  async find(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.filter(VenueMaster) filter?: Filter<VenueMaster>,
  ): Promise<VenueMaster[]> {

    const userId = currentUserProfile[securityId];
    let designation = await this.userRepository.getDesignation(userId);
    //Add the vendor into filter
    if (!filter) {
      filter = {};
    }
    if (designation == 'admin') {

    }
    if (designation == 'vendor') {
      filter = await this.userRepository.addVendorFilter(
        filter,
        currentUserProfile,
      );
    } else if (designation == 'employee') {
      const userId = currentUserProfile[securityId];
      let employee = await this.employeeRepository.findOne({ where: { userId } })
      let assignedVenueIds = employee?.assignedVenueIds ?? [];
      if (assignedVenueIds.length == 0) {
        return [];
      }
      filter.where = {};
      filter.where.or = [];
      for (const element of assignedVenueIds) {
        filter.where.or.push({ id: element });
      }
    } else {
      return [];
    }

    // End if add vendor into filter
    return this.venueMasterRepository.find(filter);
  }

  //@authenticate('jwt')
  @get('/venues')
  @response(200, {
    description: 'Array of VenueMaster model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VenueMaster, { includeRelations: true }),
        },
      },
    },
  })
  async findAll(
    @param.filter(VenueMaster) filter?: Filter<VenueMaster>,
  ): Promise<VenueMaster[]> {
    return this.venueMasterRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/venues')
  @response(200, {
    description: 'VenueMaster PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VenueMaster, { partial: true }),
        },
      },
    })
    venueMaster: VenueMaster,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.where(VenueMaster) where?: Where<VenueMaster>,
  ): Promise<Count> {
    if (!venueMaster.vendorId) {
      venueMaster.vendorId = await this.userRepository.getVendorId(
        currentUserProfile[securityId],
      );
    }
    return this.venueMasterRepository.updateAll(venueMaster, where);
  }

  //@authenticate('jwt')
  @get('/venues/{id}')
  @response(200, {
    description: 'VenueMaster model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VenueMaster, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VenueMaster, { exclude: 'where' })
    filter?: FilterExcludingWhere<VenueMaster>,
  ): Promise<VenueMaster> {
    return this.venueMasterRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/venues/{id}')
  @response(204, {
    description: 'VenueMaster PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VenueMaster, { partial: true }),
        },
      },
    })
    venueMaster: VenueMaster,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    if (!venueMaster.vendorId) {
      venueMaster.vendorId = await this.userRepository.getVendorId(
        currentUserProfile[securityId],
      );
    }
    await this.venueMasterRepository.updateById(id, venueMaster);
  }

  //@authenticate('jwt')
  @put('/venues/{id}')
  @response(204, {
    description: 'VenueMaster PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() venueMaster: VenueMaster,
  ): Promise<void> {
    await this.venueMasterRepository.replaceById(id, venueMaster);
  }

  @del('/venues/{id}')
  @response(204, {
    description: 'VenueMaster DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.venueMasterRepository.deleteById(id);
  }

  //venue gallery
  @authenticate('jwt')
  @post('/venues/gallery/{venueId}', {
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
    @param.path.string('venueId') venueId: string,
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
          const result = await uploadFile(files, 'venue-assets/' + vendorId + '/' + venueId + '/');
          let venue = await this.venueMasterRepository.findById(venueId);
          if (!venue.gallery) {
            venue.gallery = [];
          }
          venue.gallery.push(result.url);
          let updatedVenue = await this.venueMasterRepository.update(venue);
          resolve(result);
          return result;
        }
      });
    });
  }


  @authenticate('jwt')
  @del('/venues/gallery/{venueId}/{index}', {
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
  async deleteGalleryImage(
    @param.path.string('venueId') venueId: string,
    @param.path.string('index') index: number,
    @inject(RestBindings.Http.RESPONSE) response: Response
  ): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {
      let venue = await this.venueMasterRepository.findById(venueId);
      if (venue.gallery && venue.gallery.length > index) {
        let url = venue.gallery[index];
        let key = url.replace(awsS3BaseUrl, '')
        const result = await deleteFile(key);
        if (result.isSuccess) {
          venue.gallery.splice(index, 1);
          let updatedVenue = await this.venueMasterRepository.update(venue);
          resolve(result);
          return result;
        }
      }
      return { isSuccess: false }
    });
  }

  //pricing gallery
  @authenticate('jwt')
  @post('/venues/pricing-gallery/{venueId}', {
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

  async uploadPricingGallery(
    @requestBody.file()
    request: Request,
    @param.path.string('venueId') venueId: string,
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
          const result = await uploadFile(files, 'venue-assets/' + vendorId + '/' + venueId + '/');
          let venue = await this.venueMasterRepository.findById(venueId);
          if (!venue.pricing) {
            venue.pricing = { gallery: [] }
          }
          if (!venue.pricing['gallery'] || !venue.pricing['gallery'].length) {
            venue.pricing['gallery'] = []
          }
          venue.pricing.gallery.push(result.url);
          let updatedVenue = await this.venueMasterRepository.update(venue);
          resolve(result);
          return result;
        }
      });
    });
  }

  //@authenticate('jwt')
  @del('/venues/pricing-gallery/{venueId}/{index}', {
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
  async deletePricingGalleryImage(
    @param.path.string('venueId') venueId: string,
    @param.path.string('index') index: number,
    @inject(RestBindings.Http.RESPONSE) response: Response
  ): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {
      let venue = await this.venueMasterRepository.findById(venueId);
      if (venue.pricing.gallery && venue.pricing.gallery.length > index) {
        let url = venue.pricing.gallery[index];
        let key = url.replace(awsS3BaseUrl, '')
        const result = await deleteFile(key);
        if (result.isSuccess) {
          venue.pricing.gallery.splice(index, 1);
          let updatedVenue = await this.venueMasterRepository.update(venue);
          resolve(result);
          return result;
        }
      }
      return { isSuccess: false }
    });
  }


  //for Availability
  //@authenticate('jwt')
  @post('/venues/{id}/{entities}')
  @response(204, {
    description: 'VenueMaster PATCH success',
  })
  async updateByEntities(
    @param.path.string('id') id: string,
    @param.path.string('entities') entities: string,
    @requestBody({})
    venueMaster: any,
  ): Promise<void> {
    if (allowedVenueEntities.indexOf(entities) == -1) {
      //entity is invalid
    } else {
      // entity is valid
    }

    let venue = await this.venueMasterRepository.findById(id);
    if (venue) {
      venue[entities] = venueMaster;
    }
    await this.venueMasterRepository.updateById(id, venue);
  }
  @get('/venue-contact/{id}', {
    responses: {
      '200': {
        description: 'Array of Employee model instances for a specific venue',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Employee, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async findEmployeesByVenue(
    @param.path.string('id') venueId: string,
    @param.filter(Employee) filter?: Filter<any>,
  ): Promise<Employee[]> {
    if (!filter) {
      filter = {};
    }
    filter.where = { assignedVenueIds: venueId }
    return this.employeeRepository.find(filter);
  }
}
