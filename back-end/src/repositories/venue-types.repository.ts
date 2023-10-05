import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import { VenueType,VenueTypeRelations } from '../models/venue-types.model ';

export class VenueTypeRepository extends DefaultCrudRepository<
 VenueType,
  typeof VenueType.prototype.id,
  VenueTypeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(VenueType, dataSource);
  }
}
