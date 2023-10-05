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
import {Rules} from '../models';
import {RulesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

export class VenuerulesController {
  constructor(
    @repository(RulesRepository)
    public rulesRepository : RulesRepository,
  ) {}

  @authenticate('jwt')
  @post('/rules')
  @response(200, {
    description: 'Rules model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rules)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rules, {
            title: 'NewRules',
            exclude: ['id'],
          }),
        },
      },
    })
    rules: Omit<Rules, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile
  ): Promise<Rules> {
    const userId = currentUserProfile[securityId];
    var test = rules;
    console.log('************* user Id: ',userId)
    test['createdBy'] = userId;
    return this.rulesRepository.create(rules);
  }

  @get('/rules/count')
  @response(200, {
    description: 'Rules model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Rules) where?: Where<Rules>,
  ): Promise<Count> {
    return this.rulesRepository.count(where);
  }

  @get('/rules')
  @response(200, {
    description: 'Array of Rules model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rules, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rules) filter?: Filter<Rules>,
  ): Promise<Rules[]> {
    return this.rulesRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/rules')
  @response(200, {
    description: 'Rules PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rules, {partial: true}),
        },
      },
    })
    rules: Rules,
    @param.where(Rules) where?: Where<Rules>,
  ): Promise<Count> {
    return this.rulesRepository.updateAll(rules, where);
  }

  @get('/rules/{id}')
  @response(200, {
    description: 'Rules model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rules, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Rules, {exclude: 'where'}) filter?: FilterExcludingWhere<Rules>
  ): Promise<Rules> {
    return this.rulesRepository.findById(id, filter);
  }

  @patch('/rules/{id}')
  @response(204, {
    description: 'Rules PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rules, {partial: true}),
        },
      },
    })
    rules: Rules,
  ): Promise<void> {
    await this.rulesRepository.updateById(id, rules);
  }

  @put('/rules/{id}')
  @response(204, {
    description: 'Rules PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() rules: Rules,
  ): Promise<void> {
    await this.rulesRepository.replaceById(id, rules);
  }

  @del('/rules/{id}')
  @response(204, {
    description: 'Rules DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rulesRepository.deleteById(id);
  }
}
