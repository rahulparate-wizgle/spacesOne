import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {SafetyRule, SafetyRuleRelations} from '../models';

export class SafetyRuleRepository extends DefaultCrudRepository<
  SafetyRule,
  typeof SafetyRule.prototype.id,
  SafetyRuleRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(SafetyRule, dataSource);
  }
}
