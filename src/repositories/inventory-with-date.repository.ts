import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {InventoryWithDate, InventoryWithDateRelations, Inventory} from '../models';
import {InventoryRepository} from './inventory.repository';

export class InventoryWithDateRepository extends DefaultCrudRepository<
  InventoryWithDate,
  typeof InventoryWithDate.prototype.id,
  InventoryWithDateRelations
> {

  public readonly inventory: BelongsToAccessor<Inventory, typeof InventoryWithDate.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('InventoryRepository') protected inventoryRepositoryGetter: Getter<InventoryRepository>,
  ) {
    super(InventoryWithDate, dataSource);
    this.inventory = this.createBelongsToAccessorFor('inventory', inventoryRepositoryGetter,);
    this.registerInclusionResolver('inventory', this.inventory.inclusionResolver);
  }
}
