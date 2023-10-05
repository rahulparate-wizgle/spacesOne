import {Entity, hasOne, model, property} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';

@model({
  settings: {
    strict: true,
    indexes: {
      uniqueUsername: {
        keys: {
          username: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
  name: 'users',
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type:'string'
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;
  

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // password: string;
  // $2a$10$0oIZ4nxIJx84Iz0VF5jh0.qD0a3yJpZv2KH0jKS50B26TgvgswAme   -----  123456

  @hasOne(() => UserCredentials, {keyTo: 'userId'})
  userCredentials: UserCredentials;

  @property({
    type: 'array',
    itemType: 'string',
  })
  roles?: string[];

  @property({
    type: 'string',
    required: false,
  })
  vendorId?: string;

  // @property({
  //   type: 'number',
  // })
  // createdBy?: number;

  // @property({
  //   type: 'date',
  //   default: '$now',
  // })
  // createdAt?: string;

  // @property({
  //   type: 'number',
  // })
  // updatedBy?: number;

  // @property({
  //   type: 'date',
  // })
  // updatedAt?: string;

  // @property({
  //   type: 'number',
  //   required: false,
  // })
  // deletedBy?: number;

  // @property({
  //   type: 'date',
  //   required: false,
  // })
  // deletedAt?: string;

// ADDITIONAL PROPERTIES ADD ACCORDING TO FORM
  @property({
    type: 'string',
    required: false,
  })
  number?: string;

  @property({
    type: 'string',
    required: false,
  })
  password?: string;

  @property({
    type: 'string',
    required: false,
  })
  cname?: string;

  @property({
    type: 'string',
    required: false,
  })
  vname?: string;

  @property({
    type: 'string',
    required: false,
  })
  email?: string;

  @property({
    type: 'string',
    required: false,
  })
  link?: string;

  @property({
    type: 'string',
    required: false,
  })
  address?: string;

  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
