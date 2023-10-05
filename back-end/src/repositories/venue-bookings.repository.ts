import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {VenueBookings, VenueBookingsRelations, VenueMaster} from '../models';
import { VenueMasterRepository } from '../repositories//venue-master.repository'; 
export class VenueBookingsRepository extends DefaultCrudRepository<
  VenueBookings,
  typeof VenueBookings.prototype.id,
  VenueBookingsRelations
> {
  public readonly venueMaster: BelongsToAccessor<
  VenueMaster,
  typeof VenueBookings.prototype.id
>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('VenueMasterRepository')
    protected VenueMasterRepository: Getter<VenueMasterRepository>,
  ) {
    super(VenueBookings, dataSource);
    this.venueMaster = this.createBelongsToAccessorFor(
      'VenueMaster',
      VenueMasterRepository,
    );
    this.registerInclusionResolver('VenueMaster', this.venueMaster.inclusionResolver);
  }
}
