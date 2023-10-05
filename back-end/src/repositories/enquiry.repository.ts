import { VendorsRepository } from './vendors.repository';
import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Customer, Employee, enquiry, enquiryRelations, Vendors, VenueMaster } from '../models';
import { VenueMasterRepository } from './venue-master.repository';
import { EmployeeRepository } from './employee.repository';
import { CustomerRepository } from './customer.repository';

export class enquiryRepository extends DefaultCrudRepository<
  enquiry,
  typeof enquiry.prototype.id,
  enquiryRelations
> {
  public readonly vendor: BelongsToAccessor<
    Vendors,
    typeof enquiry.prototype.id
  >;

  public readonly venue: BelongsToAccessor<
    VenueMaster,
    typeof enquiry.prototype.id
  >;
  public readonly employees: BelongsToAccessor<
    Employee,
    typeof enquiry.prototype.id
  >;
  public readonly customer: BelongsToAccessor<
  Customer,
  typeof enquiry.prototype.id
>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('VendorsRepository')
    protected vendorsRepository: Getter<VendorsRepository>,

    @repository.getter('CustomerRepository')
    protected customerRepository: Getter<CustomerRepository>,

    @repository.getter('VenueMasterRepository')
    protected VenueMasterRepository: Getter<VenueMasterRepository>,

    @repository.getter('EmployeeRepository')
    protected EmployeeRepository: Getter<EmployeeRepository>,

  ) {
    super(enquiry, dataSource);

    this.vendor = this.createBelongsToAccessorFor(
      'vendor',
      vendorsRepository,
    );
    this.registerInclusionResolver('vendor', this.vendor.inclusionResolver);

    this.customer = this.createBelongsToAccessorFor(
      'customer',
      customerRepository,
    );
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);



    this.venue = this.createBelongsToAccessorFor(
      'venue',
      VenueMasterRepository,
    );
    this.registerInclusionResolver('venue', this.venue.inclusionResolver);

    this.employees = this.createBelongsToAccessorFor(
      'employees',
      EmployeeRepository,
    );
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);

  }
}
