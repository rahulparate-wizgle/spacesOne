import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class AdditionalBenefits extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'array',
    itemType: 'string',
    length: 20,
  })
  type?: string[]; 

  
  @property({
    type: 'string',
    required: true,
  })
  icon: string;
  
  @property({
    type: 'string',
    required: false,
  })
  createdBy: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AdditionalBenefits>) {
    super(data);
  }
}

export interface AdditionalBenefitsRelations {
  // describe navigational properties here
}

export type AdditionalBenefitsWithRelations = AdditionalBenefits & AdditionalBenefitsRelations;
