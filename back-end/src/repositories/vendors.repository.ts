import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Vendors, VendorsRelations} from '../models';

export class VendorsRepository extends DefaultCrudRepository<
  Vendors,
  typeof Vendors.prototype.id,
  VendorsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Vendors, dataSource);
  }
}
