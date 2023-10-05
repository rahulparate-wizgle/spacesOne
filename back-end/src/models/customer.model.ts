import {Entity, model, property} from '@loopback/repository';


@model({settings: {strict: false}})
export class Customer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // @property({
  //   type: 'string',
  //   required: false,
  // })
  // username?: string;
  @property({
    type: 'string',
    required: false,
  })
  name?: string;

  @property({
    type: 'string',
    required: false,
  })
  address?: string;

  @property({
    type: 'string',
    required: false,
  })
  email?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
    required: false,
  })
  mobileNumber?: string;

  @property({
    type: 'string',
    required: false,
  })
  password?: string;

  @property({
    type: 'string',
    required: false
  })
  confirmpwd?: string

  @property({
    type:'boolean',
    required: false,
  })
  isEmailSent?: boolean;

  @property({
    type: 'string',
    required: false,
  })
  userId?: any;

  [prop: string]: any;
  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

@model({settings: {strict: false}})
export class CustomerEmail
{
  @property({
    type: 'string',
  })
  email?: string;
}
export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
