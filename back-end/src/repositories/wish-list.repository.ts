import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {WishList, WishListRelations} from '../models/wish-list.model';

export class WishListRepository extends DefaultCrudRepository<
  WishList,
  typeof WishList.prototype.id,
  WishListRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(WishList, dataSource);
  }
}
