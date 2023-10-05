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
import {EventType} from '../models';
import {EventTypeRepository} from '../repositories';

export class EventTypeController {
  constructor(
    @repository(EventTypeRepository)
    public eventTypeRepository : EventTypeRepository,
  ) {}

  @post('/event-types')
  @response(200, {
    description: 'EventType model instance',
    content: {'application/json': {schema: getModelSchemaRef(EventType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventType, {
            title: 'NewEventType',
            exclude: ['id'],
          }),
        },
      },
    })
    eventType: Omit<EventType, 'id'>,
  ): Promise<EventType> {
    return this.eventTypeRepository.create(eventType);
  }

  @get('/event-types/count')
  @response(200, {
    description: 'EventType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EventType) where?: Where<EventType>,
  ): Promise<Count> {
    return this.eventTypeRepository.count(where);
  }

  @get('/event-types')
  @response(200, {
    description: 'Array of EventType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EventType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EventType) filter?: Filter<EventType>,
  ): Promise<EventType[]> {
    return this.eventTypeRepository.find(filter);
  }

  @patch('/event-types')
  @response(200, {
    description: 'EventType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventType, {partial: true}),
        },
      },
    })
    eventType: EventType,
    @param.where(EventType) where?: Where<EventType>,
  ): Promise<Count> {
    return this.eventTypeRepository.updateAll(eventType, where);
  }

  @get('/event-types/{id}')
  @response(200, {
    description: 'EventType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EventType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EventType, {exclude: 'where'}) filter?: FilterExcludingWhere<EventType>
  ): Promise<EventType> {
    return this.eventTypeRepository.findById(id, filter);
  }

  @patch('/event-types/{id}')
  @response(204, {
    description: 'EventType PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventType, {partial: true}),
        },
      },
    })
    eventType: EventType,
  ): Promise<void> {
    await this.eventTypeRepository.updateById(id, eventType);
  }

  @put('/event-types/{id}')
  @response(204, {
    description: 'EventType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() eventType: EventType,
  ): Promise<void> {
    await this.eventTypeRepository.replaceById(id, eventType);
  }

  @del('/event-types/{id}')
  @response(204, {
    description: 'EventType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.eventTypeRepository.deleteById(id);
  }
}
