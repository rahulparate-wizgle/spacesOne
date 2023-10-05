// inside src/models/envelope.model.ts


import {Model, model, property} from '@loopback/repository';

@model()
export class Envelope extends Model {
  @property({
    type: 'string',
  })
  from: string;

  @property({
    type: 'string',
  })
  to: string;
  @property({
    type: 'string',
    required: false,
  })
  createdBy: string;

  constructor(data?: Partial<Envelope>) {
    super(data);
  }
}