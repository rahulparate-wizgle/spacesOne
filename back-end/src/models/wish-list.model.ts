import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class WishList extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  venues: string[];

  @property({
    type: 'string',
  })
  userId: string;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<WishList>) {
    super(data);
  }
}

export interface WishListRelations {
  // describe navigational properties here
}

export type WishListWithRelations = WishList & WishListRelations;
