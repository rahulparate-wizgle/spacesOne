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
import {SafetyRule} from '../models';
import {SafetyRuleRepository} from '../repositories';

export class SafetyRuleController {
  constructor(
    @repository(SafetyRuleRepository)
    public safetyRuleRepository : SafetyRuleRepository,
  ) {}

  @post('/safety-rules')
  @response(200, {
    description: 'SafetyRule model instance',
    content: {'application/json': {schema: getModelSchemaRef(SafetyRule)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SafetyRule, {
            title: 'NewSafetyRule',
            exclude: ['id'],
          }),
        },
      },
    })
    safetyRule: Omit<SafetyRule, 'id'>,
  ): Promise<SafetyRule> {
    return this.safetyRuleRepository.create(safetyRule);
  }

  @get('/safety-rules/count')
  @response(200, {
    description: 'SafetyRule model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SafetyRule) where?: Where<SafetyRule>,
  ): Promise<Count> {
    return this.safetyRuleRepository.count(where);
  }

  @get('/safety-rules')
  @response(200, {
    description: 'Array of SafetyRule model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SafetyRule, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SafetyRule) filter?: Filter<SafetyRule>,
  ): Promise<SafetyRule[]> {
    return this.safetyRuleRepository.find(filter);
  }

  @patch('/safety-rules')
  @response(200, {
    description: 'SafetyRule PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SafetyRule, {partial: true}),
        },
      },
    })
    safetyRule: SafetyRule,
    @param.where(SafetyRule) where?: Where<SafetyRule>,
  ): Promise<Count> {
    return this.safetyRuleRepository.updateAll(safetyRule, where);
  }

  @get('/safety-rules/{id}')
  @response(200, {
    description: 'SafetyRule model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SafetyRule, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SafetyRule, {exclude: 'where'}) filter?: FilterExcludingWhere<SafetyRule>
  ): Promise<SafetyRule> {
    return this.safetyRuleRepository.findById(id, filter);
  }

  @patch('/safety-rules/{id}')
  @response(204, {
    description: 'SafetyRule PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SafetyRule, {partial: true}),
        },
      },
    })
    safetyRule: SafetyRule,
  ): Promise<void> {
    await this.safetyRuleRepository.updateById(id, safetyRule);
  }

  @put('/safety-rules/{id}')
  @response(204, {
    description: 'SafetyRule PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() safetyRule: SafetyRule,
  ): Promise<void> {
    await this.safetyRuleRepository.replaceById(id, safetyRule);
  }

  @del('/safety-rules/{id}')
  @response(204, {
    description: 'SafetyRule DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.safetyRuleRepository.deleteById(id);
  }
}
