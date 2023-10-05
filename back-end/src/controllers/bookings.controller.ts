import {authenticate} from '@loopback/authentication';
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
import {VenueBookings} from '../models';
import {
  EmployeeRepository,
  UserRepository,
  VenueBookingsRepository,
} from '../repositories';
import {inject} from '@loopback/core';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

export class BookingsController {
  constructor(
    @repository(VenueBookingsRepository)
    public venueBookingsRepository: VenueBookingsRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) {}

  @post('/venue-bookings')
  @response(200, {
    description: 'VenueBookings model instance',
    content: {'application/json': {schema: getModelSchemaRef(VenueBookings)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VenueBookings, {
            title: 'NewVenueBookings',
            exclude: ['id'],
          }),
        },
      },
    })
    venueBookings: Omit<VenueBookings, 'id'>,
  ): Promise<VenueBookings> {
    return this.venueBookingsRepository.create(venueBookings);
  }

  @get('/venue-bookings/count')
  @response(200, {
    description: 'VenueBookings model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VenueBookings) where?: Where<VenueBookings>,
  ): Promise<Count> {
    return this.venueBookingsRepository.count(where);
  }

  @get('/venue-bookings')
  @response(200, {
    description: 'Array of VenueBookings model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VenueBookings, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.filter(VenueBookings) filter?: Filter<VenueBookings>,
  ): Promise<VenueBookings[]> {
    const userId = currentUserProfile[securityId];
    let designation = await this.userRepository.getDesignation(userId);
    //Add the vendor into filter
    if (!filter) {
      filter = {};
    }
    if (designation == 'admin') {
    }

    else if (designation == 'vendor') {
      filter = await this.userRepository.addVendorFilter(
        filter,
        currentUserProfile,
      );
    } else if (designation == 'employee') {
      const userId = currentUserProfile[securityId];
      let employee = await this.employeeRepository.findOne({where: {userId}});
      let assignedVenueIds = employee?.assignedVenueIds ?? [];
      if (assignedVenueIds.length == 0) {
        return [];
      }
      filter.where = {};
      filter.where.or = [];
      for (const element of assignedVenueIds) {
        filter.where.or.push({id: element});
      }
    }  
    else {
     return []; 
    }
    // End if add vendor into filter
    return this.venueBookingsRepository.find(filter);
  }

  @patch('/venue-bookings')
  @response(200, {
    description: 'VenueBookings PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VenueBookings, {partial: true}),
        },
      },
    })
    venueBookings: VenueBookings,
    @param.where(VenueBookings) where?: Where<VenueBookings>,
  ): Promise<Count> {
    return this.venueBookingsRepository.updateAll(venueBookings, where);
  }

  @get('/venue-bookings/{id}')
  @response(200, {
    description: 'VenueBookings model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VenueBookings, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VenueBookings, {exclude: 'where'})
    filter?: FilterExcludingWhere<VenueBookings>,
  ): Promise<VenueBookings> {
    return this.venueBookingsRepository.findById(id, filter);
  }

  @patch('/venue-bookings/{id}')
  @response(204, {
    description: 'VenueBookings PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VenueBookings, {partial: true}),
        },
      },
    })
    venueBookings: VenueBookings,
  ): Promise<void> {
    await this.venueBookingsRepository.updateById(id, venueBookings);
  }

  @put('/venue-bookings/{id}')
  @response(204, {
    description: 'VenueBookings PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() venueBookings: VenueBookings,
  ): Promise<void> {
    await this.venueBookingsRepository.replaceById(id, venueBookings);
  }

  @del('/venue-bookings/{id}')
  @response(204, {
    description: 'VenueBookings DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.venueBookingsRepository.deleteById(id);
  }
}
