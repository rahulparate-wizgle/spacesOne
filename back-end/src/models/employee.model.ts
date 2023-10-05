import {belongsTo, Entity, model, property} from '@loopback/repository';
import { Vendors } from './vendors.model';

@model({settings: {strict: false}, name: 'employees'})
export class Employee extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  designation: string;

  @property({
    type: 'string',
  })
  userId: any;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  contactNo?: string;

  @property({
    type: 'array',
    itemType: 'string',
    length: 20,
  })
  location?: string[];

  @property({
    type: 'array',
    itemType: 'string',
    length: 20,
  })
  assignedVenueIds?: string[];

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  company?: string;

  @property({
    type: 'string',
    required: false,
  })
  password?: string;

  @belongsTo(() => Vendors, {name:'vendor'})
  vendorId?: string;

  @belongsTo(() => Employee)
  researchManagerId: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'number',
  })
  otp?: number;

  @property({
    type: 'boolean',
  })
  isOtpSent?: boolean;

  @property({
    type: 'string',
  })
  createdAt?: string;

  @property({
    type: 'string',
  })
  otpGeneratedAt: string;

  @property({
    type: 'boolean',
  })
  isEmailVerify?: boolean;


  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

@model({settings: {strict: false}})
export class EmployeeEmail
{
  @property({
    type: 'string',
  })
  email?: string;
}
export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
