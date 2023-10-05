import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {HouseStandard, HouseStandardRelations} from '../models';

export class HouseStandardRepository extends DefaultCrudRepository<
  HouseStandard,
  typeof HouseStandard.prototype.id,
  HouseStandardRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(HouseStandard, dataSource);
  }
}
