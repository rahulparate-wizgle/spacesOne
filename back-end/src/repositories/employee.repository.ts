import {DefaultCrudRepository, BelongsToAccessor, repository} from '@loopback/repository';
import {Employee, EmployeeRelations, Vendors} from '../models';
import {DbDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import { VendorsRepository } from './vendors.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {
  public readonly vendor: BelongsToAccessor<
  Vendors,
  typeof Employee.prototype.id
>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  @repository.getter('VendorsRepository')
  protected vendorsRepository: Getter<VendorsRepository>,
  ) {
    super(Employee, dataSource);
    this.vendor = this.createBelongsToAccessorFor(
      'vendor',
      vendorsRepository,
    );
    this.registerInclusionResolver('vendor', this.vendor.inclusionResolver);
  }
}
