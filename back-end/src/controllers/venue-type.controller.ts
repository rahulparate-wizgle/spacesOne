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
import { VenueType } from '../models/venue-types.model ';
import { VenueTypeRepository } from '../repositories/venue-types.repository';
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

export class VenueTypeController {
 
  constructor(
    @repository(VenueTypeRepository)
    public venueTypeRepository : VenueTypeRepository,
  ) {}

  @authenticate('jwt')
  @post('/venue-types')
  @response(200, {
    description: 'Venue Type model instance',
    content: {'application/json': {schema: getModelSchemaRef(VenueType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VenueType, {
            title: 'NewVenueType',
            exclude: ['id'],
          }),
        },
      },
    })
    venuetype: Omit<VenueType, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile
  ): Promise<VenueType> {
    const userId = currentUserProfile[securityId];
    var test = venuetype;
    console.log('************* user Id: ',userId)
    test['createdBy'] = userId;
    return this.venueTypeRepository.create(venuetype);
  }

  @authenticate('jwt')
  @get('/venue-types/count')
  @response(200, {
    description: 'Venue Type model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VenueType) where?: Where<VenueType>,
  ): Promise<Count> {
    return this.venueTypeRepository.count(where);
  }

  // @authenticate('jwt')
  @get('/venue-types')
  @response(200, {
    description: 'Array of Venue Type model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VenueType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VenueType) filter?: Filter<VenueType>,
  ): Promise<VenueType[]> {
    return this.venueTypeRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/venue-types')
  @response(200, {
    description: 'Venue Type PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VenueType, {partial: true}),
        },
      },
    })
    venuetype: VenueType,
    @param.where(VenueType) where?: Where<VenueType>,
  ): Promise<Count> {
    return this.venueTypeRepository.updateAll(venuetype, where);
  }

  @authenticate('jwt')
  @get('/venue-types/{id}')
  @response(200, {
    description: 'Venue Type model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VenueType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VenueType, {exclude: 'where'}) filter?: FilterExcludingWhere<VenueType>
  ): Promise<VenueType> {
    return this.venueTypeRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/venue-types/{id}')
  @response(204, {
    description: 'Venue Type PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VenueType, {partial: true}),
        },
      },
    })
    venuetype: VenueType,
  ): Promise<void> {
    await this.venueTypeRepository.updateById(id, venuetype);
  }

  @authenticate('jwt')
  @put('/venue-types/{id}')
  @response(204, {
    description: 'Venue Type PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() venuetype:VenueType,
  ): Promise<void> {
    await this.venueTypeRepository.replaceById(id, venuetype);
  }

  @authenticate('jwt')
  @del('/venue-types/{id}')
  @response(204, {
    description: 'Venue Type DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.venueTypeRepository.deleteById(id);
  }
}
