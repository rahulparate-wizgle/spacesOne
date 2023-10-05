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
import {AdditionalBenefits} from '../models';
import {AdditionalBenefitsRepository} from '../repositories';

export class AdditionalBenefitsController {
  constructor(
    @repository(AdditionalBenefitsRepository)
    public additionalBenefitsRepository : AdditionalBenefitsRepository,
  ) {}

  @post('/additional-benefits')
  @response(200, {
    description: 'AdditionalBenefits model instance',
    content: {'application/json': {schema: getModelSchemaRef(AdditionalBenefits)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalBenefits, {
            title: 'NewAdditionalBenefits',
            exclude: ['id'],
          }),
        },
      },
    })
    additionalBenefits: Omit<AdditionalBenefits, 'id'>,
  ): Promise<AdditionalBenefits> {
    return this.additionalBenefitsRepository.create(additionalBenefits);
  }

  @get('/additional-benefits/count')
  @response(200, {
    description: 'AdditionalBenefits model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AdditionalBenefits) where?: Where<AdditionalBenefits>,
  ): Promise<Count> {
    return this.additionalBenefitsRepository.count(where);
  }

  @get('/additional-benefits')
  @response(200, {
    description: 'Array of AdditionalBenefits model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AdditionalBenefits, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AdditionalBenefits) filter?: Filter<AdditionalBenefits>,
  ): Promise<AdditionalBenefits[]> {
    return this.additionalBenefitsRepository.find(filter);
  }

  @patch('/additional-benefits')
  @response(200, {
    description: 'AdditionalBenefits PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalBenefits, {partial: true}),
        },
      },
    })
    additionalBenefits: AdditionalBenefits,
    @param.where(AdditionalBenefits) where?: Where<AdditionalBenefits>,
  ): Promise<Count> {
    return this.additionalBenefitsRepository.updateAll(additionalBenefits, where);
  }

  @get('/additional-benefits/{id}')
  @response(200, {
    description: 'AdditionalBenefits model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AdditionalBenefits, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AdditionalBenefits, {exclude: 'where'}) filter?: FilterExcludingWhere<AdditionalBenefits>
  ): Promise<AdditionalBenefits> {
    return this.additionalBenefitsRepository.findById(id, filter);
  }

  @patch('/additional-benefits/{id}')
  @response(204, {
    description: 'AdditionalBenefits PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalBenefits, {partial: true}),
        },
      },
    })
    additionalBenefits: AdditionalBenefits,
  ): Promise<void> {
    await this.additionalBenefitsRepository.updateById(id, additionalBenefits);
  }

  @put('/additional-benefits/{id}')
  @response(204, {
    description: 'AdditionalBenefits PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() additionalBenefits: AdditionalBenefits,
  ): Promise<void> {
    await this.additionalBenefitsRepository.replaceById(id, additionalBenefits);
  }

  @del('/additional-benefits/{id}')
  @response(204, {
    description: 'AdditionalBenefits DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.additionalBenefitsRepository.deleteById(id);
  }
}
