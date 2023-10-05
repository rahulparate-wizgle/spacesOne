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
import {Attributes} from '../models';
import {AttributesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

export class VenueAttributesController {
  constructor(
    @repository(AttributesRepository)
    public attributesRepository : AttributesRepository,
  ) {}

  @authenticate('jwt')
  @post('/attributes')
  @response(200, {
    description: 'Attributes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Attributes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attributes, {
            title: 'NewAttributes',
            exclude: ['id'],
          }),
        },
      },
    })
    attributes: Omit<Attributes, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile
  ): Promise<Attributes> {
    const userId = currentUserProfile[securityId];
    var test = attributes;
    console.log('************* user Id: ',userId)
    test['createdBy'] = userId;
    return this.attributesRepository.create(attributes);
  }

  @get('/attributes/count')
  @response(200, {
    description: 'Attributes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Attributes) where?: Where<Attributes>,
  ): Promise<Count> {
    return this.attributesRepository.count(where);
  }

  @get('/attributes')
  @response(200, {
    description: 'Array of Attributes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Attributes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Attributes) filter?: Filter<Attributes>,
  ): Promise<Attributes[]> {
    return this.attributesRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/attributes')
  @response(200, {
    description: 'Attributes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attributes, {partial: true}),
        },
      },
    })
    attributes: Attributes,
    @param.where(Attributes) where?: Where<Attributes>,
  ): Promise<Count> {
    return this.attributesRepository.updateAll(attributes, where);
  }

  @get('/attributes/{id}')
  @response(200, {
    description: 'Attributes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Attributes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Attributes, {exclude: 'where'}) filter?: FilterExcludingWhere<Attributes>
  ): Promise<Attributes> {
    return this.attributesRepository.findById(id, filter);
  }

  @patch('/attributes/{id}')
  @response(204, {
    description: 'Attributes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attributes, {partial: true}),
        },
      },
    })
    attributes: Attributes,
  ): Promise<void> {
    await this.attributesRepository.updateById(id, attributes);
  }

  @put('/attributes/{id}')
  @response(204, {
    description: 'Attributes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() attributes: Attributes,
  ): Promise<void> {
    await this.attributesRepository.replaceById(id, attributes);
  }

  @del('/attributes/{id}')
  @response(204, {
    description: 'Attributes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.attributesRepository.deleteById(id);
  }
}
