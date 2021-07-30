import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {InventoryItem, InventoryItemRelations, ItemName, Inventory} from '../models';
import {ItemNameRepository} from './item-name.repository';
import {InventoryRepository} from './inventory.repository';

export class InventoryItemRepository extends DefaultCrudRepository<
  InventoryItem,
  typeof InventoryItem.prototype.id,
  InventoryItemRelations
> {

  public readonly itemName: BelongsToAccessor<ItemName, typeof InventoryItem.prototype.id>;

  public readonly inventory: BelongsToAccessor<Inventory, typeof InventoryItem.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ItemNameRepository') protected itemNameRepositoryGetter: Getter<ItemNameRepository>, @repository.getter('InventoryRepository') protected inventoryRepositoryGetter: Getter<InventoryRepository>,
  ) {
    super(InventoryItem, dataSource);
    this.inventory = this.createBelongsToAccessorFor('inventory', inventoryRepositoryGetter,);
    this.registerInclusionResolver('inventory', this.inventory.inclusionResolver);
    this.itemName = this.createBelongsToAccessorFor('itemName', itemNameRepositoryGetter,);
    this.registerInclusionResolver('itemName', this.itemName.inclusionResolver);
  }
}
