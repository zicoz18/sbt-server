import { /* inject, */ BindingScope, inject, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {SteamService} from '.';
import {InventoryItem, InventoryItemRelations, InventoryWithDate, ItemPriceWithDate} from '../models';
import {InventoryRepository, InventoryWithDateRepository, ItemNameRepository, ItemPriceWithDateRepository} from '../repositories';
import {TelegramBotService} from './telegram-bot.service';

@injectable({scope: BindingScope.TRANSIENT})
export class UpdateInventoryService {
  constructor(
    @inject('services.Steam')
    protected steamService: SteamService,

    @repository(InventoryRepository)
    public inventoryRepository: InventoryRepository,

    @repository(ItemNameRepository)
    public itemNameRepository: ItemNameRepository,

    @repository(InventoryWithDateRepository)
    public inventoryWithDateRepository: InventoryWithDateRepository,

    @repository(ItemPriceWithDateRepository)
    public itemPriceWithDateRepository: ItemPriceWithDateRepository,

    @service(TelegramBotService)
    protected telegramBotService: TelegramBotService,
  ) { }

  async update() {
    const currentDate = new Date();
    const inventory = await this.inventoryRepository.findOne({
      where: {name: 'ziya'},
      include: [{
        relation: 'inventoryItems',
        scope: {
          include: ['itemName'],
        },
      }]
    });
    if (inventory?.inventoryItems) {
      const itemPricesWithDate: ItemPriceWithDate[] = [];
      let inventoryBalance = 0;

      for (const inventoryItem of inventory.inventoryItems) {
        try {
          const steamItemInfo = await this.steamService.getItemInfo((<InventoryItem & InventoryItemRelations>inventoryItem).itemName.market_hash_name);
          const itemPriceWithDate = <ItemPriceWithDate>{
            price: steamItemInfo.median_price,
            date: currentDate,
            itemNameId: inventoryItem.itemNameId
          };
          itemPricesWithDate.push(itemPriceWithDate);
          inventoryBalance += inventoryItem.amount * parseFloat(itemPriceWithDate.price.replace(",", "."));
        } catch (error) {
          throw new HttpErrors[422]('Cannot get item info from steam api.');
        }
      }
      const inventoryWithDate = <InventoryWithDate>{
        date: currentDate,
        balance: inventoryBalance,
        inventoryId: inventory.id
      };
      try {
        const createdItemPricesWithDate = await this.itemPriceWithDateRepository.createAll(itemPricesWithDate);
        const createdInventoryWithDate = await this.inventoryWithDateRepository.create(inventoryWithDate);
        // console.log(`Successfully update at ${currentDate}\n\nCreated ItemPricesWithDate: \n${createdItemPricesWithDate} \n\nCreatedInventoryWithDate: \n${createdInventoryWithDate}\n\n`);
        console.log(`Database Updated mannually at ${currentDate}`);
        const message = `Balance: ${inventoryBalance}\nUpdated at ${currentDate}.`
        await this.telegramBotService.sendMessage(message);
        return createdInventoryWithDate;
      } catch (error) {
        console.log(error)
      }
    } else {
      throw new HttpErrors[422]('Inventory\'s items cannot be found.');
    }
  }
  /*
   * Add service methods here
   */
}
