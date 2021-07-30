import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Inventory, InventoryRelations, InventoryItem} from '../models';
import {InventoryItemRepository} from './inventory-item.repository';

export class InventoryRepository extends DefaultCrudRepository<
  Inventory,
  typeof Inventory.prototype.id,
  InventoryRelations
> {

  public readonly inventoryItems: HasManyRepositoryFactory<InventoryItem, typeof Inventory.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('InventoryItemRepository') protected inventoryItemRepositoryGetter: Getter<InventoryItemRepository>,
  ) {
    super(Inventory, dataSource);
    this.inventoryItems = this.createHasManyRepositoryFactoryFor('inventoryItems', inventoryItemRepositoryGetter,);
    this.registerInclusionResolver('inventoryItems', this.inventoryItems.inclusionResolver);
  }
}
