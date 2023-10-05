import { model, property} from '@loopback/repository';

@model({settings: {strict: false}, name: 'comments'})
  export class NewCommentsRequest  {
    @property({
      type: 'string',
    })
    message: string;
  }
