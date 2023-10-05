import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Media extends Entity {
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
  Bucket: string;

  @property({
    type: 'string',
    required: true,
  })
  ETag: string;

  @property({
    type: 'string',
    required: true,
  })
  Key: string;

  @property({
    type: 'string',
    required: true,
  })
  Location: string;

  @property({
    type: 'string',
  })
  key?: string;

  constructor(data?: Partial<Media>) {
    super(data);
  }
}

export interface MediaRelations {
  // describe navigational properties here
}

export type MediaWithRelations = Media & MediaRelations;
