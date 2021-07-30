import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { ItemName, ItemNameRelations } from '../models';

export class ItemNameRepository extends DefaultCrudRepository<
  ItemName,
  typeof ItemName.prototype.id,
  ItemNameRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ItemName, dataSource);
  }
}
