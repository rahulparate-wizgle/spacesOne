import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {VenueBookings, VenueMaster, VenueMasterRelations} from '../models';
import { VenueBookingsRepository } from './venue-bookings.repository';

export class VenueMasterRepository extends DefaultCrudRepository<
  VenueMaster,
  typeof VenueMaster.prototype.id,
  VenueMasterRelations
> {
  public readonly venueBookings: HasManyRepositoryFactory<
  VenueBookings,
  typeof VenueMaster.prototype.id
>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('VenueBookingsRepository')
    venueBookingsRepositoryGetter: Getter<VenueBookingsRepository>,
  ) {
    super(VenueMaster, dataSource);
    this.venueBookings = this.createHasManyRepositoryFactoryFor(
      'venueBookings',
      venueBookingsRepositoryGetter,
    );

    this.registerInclusionResolver('venueBookings', this.venueBookings.inclusionResolver);
  }
}
