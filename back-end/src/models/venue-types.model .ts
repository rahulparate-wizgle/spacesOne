import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class VenueType extends Entity {
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
    type: 'string',
    required: true,
  })
  description: string;
  
  @property({
    type: 'string',
    required: true,
  })
  icon: string;
  

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<VenueType>) {
    super(data);
  }
}

export interface  VenueTypeRelations {
  // describe navigational properties here
}

export type VenueTypeWithRelations = VenueType  &  VenueTypeRelations;
