import {Entity, hasMany, model, property} from '@loopback/repository';
import { VenueBookings } from './venue-bookings.model';

@model()
export class VenueMaster extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: false,
  })
  name: string;


  // @property({
  //   type: 'object',
  //   required: false,
  // })
  // type: object;

  @property({
    type:'array',
    itemType: 'object',
    required: false
  })
  eventType?:object[];

  @property({
    type: 'array',
    itemType: 'string',
    length: 20,
  })
  type?: string[]; 

  @property({
    type: 'array',
    itemType: 'string',
    length: 20,
  })
  amenitiesType?: string[]; 
  @property({
    type: 'array',
    itemType: 'string',
    length: 20,
  })
  attributesType?: string[]; 

  @property({
    type: 'string',
    required: false,
  })
  address: string;

  @property({
    type: 'string',
    required: false,
  })
  location: string;

  @property({
    type: 'number',
    required: false,
  })
  rating: number;

  @property({
    type: 'string',
    required: false,
  })
  image: string;

  @property({
    type: 'string',
    required: false,
  })
  city?: string;

  @property({
    type: 'object',
    required: false,
  })
  availability: object;

  @property({
    type: 'object',
    required: false,
  })
  capacity: object;

  @property({
    type: 'object',
    required: false,
  })
  rules: object;

  @property({
    type: 'object',
    required: false,
  })
  amenities: object;

  @property({
    type: 'object',
    required: false,
  })
  pricing: any;

  
  @property({
    type: 'object',
    required: false,
  })
  mapping: object;

  @property({
    type: 'array',
    itemType: 'string',
  })
  gallery: string[];

  @property({
    type: 'object',
    required: false,
  })
  houseStandard: object;

  @property({
    type: 'object',
    required: false,
  })
  custom_blocks: object;

  @property({
    type: 'object',
    required: false,
  })
  chargeable_services: object;

  @property({
    type: 'object',
    required: false,
  })
  add_on_services: object;

  @property({
    type: 'object',
    required: false,
  })
  general_attributes: object;

  @property({
    type: 'object',
    required: false,
  })
  terms_policies: object;

  @property({
    type: 'object',
    required: false,
  })
  other_key_details: object;

  @property({
    type: 'object',
    required: false,
  })
  room_tnc: object;

  @property({
    type: 'object',
    required: false,
  })
  should_know: object;

  

  @property({
    type: 'string',
    required: false,
  })
  createdBy: string;

  
  @property({
    type: 'string',
    required: false,
  })
  description?: string;

  @property({
    type: 'boolean',
    required: false,
  })
  isActive?: boolean;

  

  @property({
    type: 'string',
    required: false,
  })
  vendorId?: string;

  @property({
    type: 'string',
    required: false,
  })
  master_venue?: string;

  @property({
    type: 'boolean',
    required: false,
  })
  isRoomsAvailable?: boolean;

  @property({
    type: 'array',
    itemType: 'object',
    required: false,
  })
  roomsDetails?: object[];

  @hasMany(() => VenueBookings , {keyTo:'venueId'})
  venueBookings?: object[];
  

  [prop: string]: any;

  constructor(data?: Partial<VenueMaster>) {
    super(data);
  }
}

export interface VenueMasterRelations {
  // describe navigational properties here
}

export type VenueMasterWithRelations = VenueMaster & VenueMasterRelations;
