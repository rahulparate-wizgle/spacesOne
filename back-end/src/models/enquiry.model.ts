import { belongsTo, Entity, hasMany, model, property } from '@loopback/repository';
import { Employee } from './employee.model';
import { Vendors } from './vendors.model';
import { VenueMaster } from './venue-master.model';
import { Customer } from './customer.model';

@model({ settings: { strict: false } })
export class enquiry extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  address?: string;


  @property({
    type: 'string',
  })
  mobileNumber?: string;

  @property({
    type: 'string',
  })
  emailId?: string;

  @property({
    type: 'string',
  })
  enquiryDate?: string;
  @property({
    type: 'string',
  })
  bookingDate?: string;

  @property({
    type: 'number',
    required: false,
  })
  from_day?: number;

  @property({
    type: 'number',
    required: false,
  })
  from_month?: number;

  @property({
    type: 'number',
    required: false,
  })
  from_year?: number;

  @property({
    type: 'string',
  })
  additionalMessage?: string;

  @property({
    type: 'string',
  })
  internalComment?: string;
  @property({
    type: 'array',
    itemType: 'object',
  })
  comments: object[];

  @property({
    type: 'number',
  })
  status?: number;

  @property({
    type: 'string',
  })
  venueName?: string;


  @property({
    type: 'number',
  })
  type?: number;

  // @property({
  //   type: 'string',
  // })
  // venueDetailsLink?: string;

  @belongsTo(() => VenueMaster, { name: 'venue' })
  venueId?: string;

  @property({
    type: 'string',
    required: false,
  })
  createdBy: string;

@property({
  type: 'number',
})
numberOfPeople?: number;

  @property({
    type: 'number',
  })
  venuePrice?: number;

  @property({
    type: 'boolean',
    required: false,
  })
  isQuotationSent?: boolean;

  @property({
    type: 'boolean',
    required: false,
  })
  emailQuotation?: boolean;

  @belongsTo(() => Vendors, { name: 'vendor' })
  vendorId?: string;

  @belongsTo(() => Employee, { name: 'employees' })
  userId?: string;

  @belongsTo(() => Customer)
  customerId?: string;
 


  constructor(data?: Partial<enquiry>) {
    super(data);
  }
}

export interface enquiryRelations {
  // describe navigational properties here
}

export type enquiryWithRelations = enquiry & enquiryRelations;
