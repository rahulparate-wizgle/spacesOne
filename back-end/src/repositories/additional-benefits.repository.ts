import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AdditionalBenefits, AdditionalBenefitsRelations} from '../models';

export class AdditionalBenefitsRepository extends DefaultCrudRepository<
  AdditionalBenefits,
  typeof AdditionalBenefits.prototype.name,
  AdditionalBenefitsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AdditionalBenefits, dataSource);
  }
}
