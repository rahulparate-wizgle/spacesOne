import {Entity, model, property} from '@loopback/repository';

@model()
export class Basicdetails extends Entity {
  @property({
    type: 'string',
  })
  id?: string;

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
    type: 'array',
    itemType: 'string',
    length: 20,
  })
  type?: string[]; 


  @property({
    type: 'string',
    required: false,
  })
  image?: string;

  @property({
    type: 'string',
    required: false,
  })
  createdBy: string;

  constructor(data?: Partial<Basicdetails>) {
    super(data);
  }
}

export interface BasicdetailsRelations {
  // describe navigational properties here
}

export type BasicdetailsWithRelations = Basicdetails & BasicdetailsRelations;
