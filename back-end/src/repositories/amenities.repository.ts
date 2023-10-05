import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
// import {VenuedbDataSource} from '../datasources';
import {DbDataSource} from '../datasources';
import {Amenities, AmenitiesRelations} from '../models';

export class AmenitiesRepository extends DefaultCrudRepository<
  Amenities,
  typeof Amenities.prototype.id,
  AmenitiesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Amenities, dataSource);
  }
}
