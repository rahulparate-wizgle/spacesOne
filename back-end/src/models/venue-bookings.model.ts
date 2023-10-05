import {Entity, belongsTo, model, property} from '@loopback/repository';
import { VenueMaster } from './venue-master.model';

@model({settings: {strict: false}})
export class VenueBookings extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'number',
    required: true,
  })
  from_day: number;

  @property({
    type: 'number',
    required: true,
  })
  from_month: number;

  @property({
    type: 'number',
    required: true,
  })
  from_year: number;

  @property({
    type: 'number',
    required: true,
  })
  to_day: number;

  @property({
    type: 'number',
    required: true,
  })
  to_month: number;

  @property({
    type: 'number',
    required: true,
  })
  to_year: number;

  @property({
    type: 'string',
    required: false,
  })
  from_time?: string;

  @property({
    type: 'string',
    required: false,
  })
  to_time?: string;


  @property({
    type: 'string',
    required: false,
  })
  details?: string;

  @property({
    type: 'number',
    required: false,
  })
  status: number;

  @property({
    type: 'string',
    required: false,
  })
  isDayFor?: string;

  @belongsTo(() => VenueMaster, {name:'VenueMaster'})
  venueId: string;
  
  @property({
    type: 'string',
    required: true,
  })
  vendorId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<VenueBookings>) {
    super(data);
  }
}

export interface VenueBookingsRelations {
  // describe navigational properties here
}

export type VenueBookingsWithRelations = VenueBookings & VenueBookingsRelations;
