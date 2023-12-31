import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Vendors extends Entity {
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
  name: string;
  

 

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vendors>) {
    super(data);
  }
}

export interface VendorsRelations {
  // describe navigational properties here
}

export type VendorsWithRelations = Vendors & VendorsRelations;
