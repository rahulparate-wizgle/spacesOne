import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {EventType, EventTypeRelations} from '../models';

export class EventTypeRepository extends DefaultCrudRepository<
  EventType,
  typeof EventType.prototype.id,
  EventTypeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(EventType, dataSource);
  }
}
