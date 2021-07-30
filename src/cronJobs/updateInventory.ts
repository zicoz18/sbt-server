import { inject } from '@loopback/core';
import { CronJob, cronJob } from '@loopback/cron';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { InventoryItem, InventoryItemRelations, InventoryWithDate, ItemPriceWithDate } from '../models';
import { InventoryRepository, InventoryWithDateRepository, ItemNameRepository, ItemPriceWithDateRepository } from '../repositories';
import { SteamService } from '../services';

@cronJob()
export class UpdateInventory extends CronJob {
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
  ) {
    super({
      name: 'update-inventory',
      onTick: async () => {
        // do the work
        this.performMyJob();
      },
      // cronTime: '*/10 * * * * *', // Every ten second
      // cronTime: '0 12 * * * *', // Everyday at 12.00 (sanırım her saatin 12. dakikasinda update'liyor şuanda)
      // cronTime: '0 0 11 * * ?', // everday at 11
      // cronTime: '0 0 11 * * *', // everday at 11
      cronTime: '0 11 * * *', // everday at 11
      start: true,
    });
  }

  async performMyJob() {
    const currentDate = new Date();
    const inventory = await this.inventoryRepository.findOne({
      where: { name: 'ziya' },
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
        console.log(`Database Updated at ${currentDate}`);
      } catch (error) {
        // throw new HttpErrors[422]('Cannot create instances.');
        console.log(error)
      }
    } else {
      throw new HttpErrors[422]('Inventory\'s items cannot be found.');
    }
  }
}