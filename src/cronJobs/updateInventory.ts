import {service} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {UpdateInventoryService} from '../services';

@cronJob()
export class UpdateInventory extends CronJob {
  constructor(
    @service(UpdateInventoryService)
    protected updateInventoryService: UpdateInventoryService,
  ) {
    super({
      name: 'update-inventory',
      onTick: async () => {
        // do the work
        this.updateInventoryService.update();
      },
      // cronTime: '*/10 * * * * *', // Every ten second
      // cronTime: '0 12 * * * *', // Everyday at 12.00 (sanırım her saatin 12. dakikasinda update'liyor şuanda)
      // cronTime: '0 0 11 * * ?', // everday at 11
      // cronTime: '0 0 11 * * *', // everday at 11
      cronTime: '5 11 * * *', // everday at 11.05
      start: true,
    });
  }
}
