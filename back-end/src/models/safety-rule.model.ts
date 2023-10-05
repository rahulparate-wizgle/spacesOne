import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class SafetyRule extends Entity {
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

  constructor(data?: Partial<SafetyRule>) {
    super(data);
  }
}

export interface SafetyRuleRelations {
  // describe navigational properties here
}

export type SafetyRuleWithRelations = SafetyRule & SafetyRuleRelations;
