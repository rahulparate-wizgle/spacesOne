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
import {HouseStandard} from '../models';
import {HouseStandardRepository} from '../repositories';

export class HouseStandardController {
  constructor(
    @repository(HouseStandardRepository)
    public houseStandardRepository : HouseStandardRepository,
  ) {}

  @post('/house-standards')
  @response(200, {
    description: 'HouseStandard model instance',
    content: {'application/json': {schema: getModelSchemaRef(HouseStandard)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HouseStandard, {
            title: 'NewHouseStandard',
            exclude: ['id'],
          }),
        },
      },
    })
    houseStandard: Omit<HouseStandard, 'id'>,
  ): Promise<HouseStandard> {
    return this.houseStandardRepository.create(houseStandard);
  }

  @get('/house-standards/count')
  @response(200, {
    description: 'HouseStandard model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HouseStandard) where?: Where<HouseStandard>,
  ): Promise<Count> {
    return this.houseStandardRepository.count(where);
  }

  @get('/house-standards')
  @response(200, {
    description: 'Array of HouseStandard model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HouseStandard, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HouseStandard) filter?: Filter<HouseStandard>,
  ): Promise<HouseStandard[]> {
    return this.houseStandardRepository.find(filter);
  }

  @patch('/house-standards')
  @response(200, {
    description: 'HouseStandard PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HouseStandard, {partial: true}),
        },
      },
    })
    houseStandard: HouseStandard,
    @param.where(HouseStandard) where?: Where<HouseStandard>,
  ): Promise<Count> {
    return this.houseStandardRepository.updateAll(houseStandard, where);
  }

  @get('/house-standards/{id}')
  @response(200, {
    description: 'HouseStandard model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HouseStandard, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(HouseStandard, {exclude: 'where'}) filter?: FilterExcludingWhere<HouseStandard>
  ): Promise<HouseStandard> {
    return this.houseStandardRepository.findById(id, filter);
  }

  @patch('/house-standards/{id}')
  @response(204, {
    description: 'HouseStandard PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HouseStandard, {partial: true}),
        },
      },
    })
    houseStandard: HouseStandard,
  ): Promise<void> {
    await this.houseStandardRepository.updateById(id, houseStandard);
  }

  @put('/house-standards/{id}')
  @response(204, {
    description: 'HouseStandard PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() houseStandard: HouseStandard,
  ): Promise<void> {
    await this.houseStandardRepository.replaceById(id, houseStandard);
  }

  @del('/house-standards/{id}')
  @response(204, {
    description: 'HouseStandard DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.houseStandardRepository.deleteById(id);
  }
}
