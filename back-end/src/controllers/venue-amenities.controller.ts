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
import {Amenities} from '../models';
import {AmenitiesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

export class VenueAmenitiesController {
  constructor(
    @repository(AmenitiesRepository)
    public amenitiesRepository : AmenitiesRepository,
  ) {}

  @authenticate('jwt')
  @post('/amenities')
  @response(200, {
    description: 'Amenities model instance',
    content: {'application/json': {schema: getModelSchemaRef(Amenities)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Amenities, {
            title: 'NewAmenities',
            exclude: ['id'],
          }),
        },
      },
    })
    amenities: Omit<Amenities, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile
  ): Promise<Amenities> {
    const userId = currentUserProfile[securityId];
    var test = amenities;
    console.log('************* user Id: ',userId)
    test['createdBy'] = userId;
    return this.amenitiesRepository.create(amenities);
  }

  @get('/amenities/count')
  @response(200, {
    description: 'Amenities model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Amenities) where?: Where<Amenities>,
  ): Promise<Count> {
    return this.amenitiesRepository.count(where);
  }

  @get('/amenities')
  @response(200, {
    description: 'Array of Amenities model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Amenities, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Amenities) filter?: Filter<Amenities>,
  ): Promise<Amenities[]> {
    return this.amenitiesRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/amenities')
  @response(200, {
    description: 'Amenities PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Amenities, {partial: true}),
        },
      },
    })
    amenities: Amenities,
    @param.where(Amenities) where?: Where<Amenities>,
  ): Promise<Count> {
    return this.amenitiesRepository.updateAll(amenities, where);
  }

  @get('/amenities/{id}')
  @response(200, {
    description: 'Amenities model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Amenities, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Amenities, {exclude: 'where'}) filter?: FilterExcludingWhere<Amenities>
  ): Promise<Amenities> {
    return this.amenitiesRepository.findById(id, filter);
  }

  @patch('/amenities/{id}')
  @response(204, {
    description: 'Amenities PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Amenities, {partial: true}),
        },
      },
    })
    amenities: Amenities,
  ): Promise<void> {
    await this.amenitiesRepository.updateById(id, amenities);
  }

  @put('/amenities/{id}')
  @response(204, {
    description: 'Amenities PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() amenities: Amenities,
  ): Promise<void> {
    await this.amenitiesRepository.replaceById(id, amenities);
  }

  @del('/amenities/{id}')
  @response(204, {
    description: 'Amenities DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.amenitiesRepository.deleteById(id);
  }
}
