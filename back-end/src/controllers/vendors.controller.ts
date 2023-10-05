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
  Response,
  RestBindings,
  HttpErrors,
} from '@loopback/rest';
import {Vendors} from '../models';
import {UserRepository, VendorsRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import multer from 'multer';

const upload = multer({dest: 'uploads/'});
const {uploadFile,deleteFile,awsS3BaseUrl} = require('../providers/awss3/s3');

export class VendorsController {
  constructor(
    @repository(VendorsRepository)
    public vendorsRepository : VendorsRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @authenticate('jwt')
  @post('/vendors')
  @response(200, {
    description: 'Vendors model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vendors)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendors, {
            title: 'NewVendors',
            exclude: ['id'],
          }),
        },
      },
    })
    vendors: Omit<Vendors, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile
  ): Promise<Vendors> {
    const userId = currentUserProfile[securityId];
    var test = vendors;
    
    test['createdBy'] = userId;
    return this.vendorsRepository.create(vendors);
  }

  @get('/vendors/count')
  @response(200, {
    description: 'Vendors model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vendors) where?: Where<Vendors>,
  ): Promise<Count> {
    return this.vendorsRepository.count(where);
  }

  @get('/vendors')
  @response(200, {
    description: 'Array of Vendors model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vendors, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vendors) filter?: Filter<Vendors>,
  ): Promise<Vendors[]> {
    return this.vendorsRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/vendors')
  @response(200, {
    description: 'Vendors PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendors, {partial: true}),
        },
      },
    })
    vendors: Vendors,
    @param.where(Vendors) where?: Where<Vendors>,
  ): Promise<Count> {
    return this.vendorsRepository.updateAll(vendors, where);
  }

  @get('/vendors/{id}')
  @response(200, {
    description: 'Vendors model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vendors, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vendors, {exclude: 'where'}) filter?: FilterExcludingWhere<Vendors>
  ): Promise<Vendors> {
    return this.vendorsRepository.findById(id, filter);
  }

  @patch('/vendors/{id}')
  @response(204, {
    description: 'Vendors PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendors, {partial: true}),
        },
      },
    })
    vendors: Vendors,
  ): Promise<void> {
    await this.vendorsRepository.updateById(id, vendors);
  }

  @put('/vendors/{id}')
  @response(204, {
    description: 'Vendors PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vendors: Vendors,
  ): Promise<void> {
    await this.vendorsRepository.replaceById(id, vendors);
  }

  @del('/vendors/{id}')
  @response(204, {
    description: 'Vendors DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendorsRepository.deleteById(id);
  }

  @authenticate('jwt')
  @post('/vendors/logo/{id}', {
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

          const result = await uploadFile(files, 'vendors/'+vendorId+'/');
          let vendor = await this.vendorsRepository.findById(id);
          
          if (vendor.logo) {
            let key = vendor.logo.replace(awsS3BaseUrl,'');
            let removelogo = deleteFile(key);
          }
          vendor.logo = result.url;
          let updateVendor = await this.vendorsRepository.update(vendor);
          
          resolve(result);
          return result;
        }
      });
    });
  }
}
