import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Rules, RulesRelations} from '../models';

export class RulesRepository extends DefaultCrudRepository<
  Rules,
  typeof Rules.prototype.id,
  RulesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Rules, dataSource);
  }
}
