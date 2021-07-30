
import { Getter, inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { get, param, post } from '@loopback/rest';
import { ItemRepository } from '../repositories';
import { SteamService, SteamProvider } from '../services';


export class SteamController {
  constructor(
    @inject('services.Steam')
    protected steamService: SteamService,
    // protected steamService: SteamProvider,
    @repository.getter('ItemRepository') private itemRepositoryGetter: Getter<ItemRepository>,
  ) { }

  @get('/steam/{itemName}')
  async getItemInfo(
    @param.path.string('itemName') itemName: string,
  ): Promise<object> {
    //Preconditions

    return this.steamService.getItemInfo(itemName);
    // return this.steamService.getItemInfo();
  }

  @post('/steam/{itemName}')
  async addItemInfo(
    @param.path.string('itemName') itemName: string,
  ): Promise<object> {
    const item = await this.steamService.getItemInfo(itemName);
    const itemRepository = await this.itemRepositoryGetter();
    // const { market_hash_name: itemName, volume, median_price } = item;
    const { volume, median_price } = item
    const createdItem = await itemRepository.create({ market_hash_name: itemName, volume, median_price });
    return createdItem;
  }
}
