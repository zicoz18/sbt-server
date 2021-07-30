import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ItemPriceWithDate, ItemPriceWithDateRelations, ItemName} from '../models';
import {ItemNameRepository} from './item-name.repository';

export class ItemPriceWithDateRepository extends DefaultCrudRepository<
  ItemPriceWithDate,
  typeof ItemPriceWithDate.prototype.id,
  ItemPriceWithDateRelations
> {

  public readonly itemName: BelongsToAccessor<ItemName, typeof ItemPriceWithDate.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ItemNameRepository') protected itemNameRepositoryGetter: Getter<ItemNameRepository>,
  ) {
    super(ItemPriceWithDate, dataSource);
    this.itemName = this.createBelongsToAccessorFor('itemName', itemNameRepositoryGetter,);
    this.registerInclusionResolver('itemName', this.itemName.inclusionResolver);
  }
}
