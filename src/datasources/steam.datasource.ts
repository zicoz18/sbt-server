import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Steam',
  connector: 'rest',
  baseURL: 'https://steamcommunity.com/',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'https://steamcommunity.com/market/priceoverview/?country=TR&currency=17&appid=730&market_hash_name={itemName}',
        // url: 'https://steamcommunity.com/market/priceoverview/?country=TR&currency=17&appid=730&market_hash_name=2020%20RMR%20Challengers',
      },
      functions: {
        // getItemInfo: [],
        getItemInfo: ['itemName'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SteamDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Steam';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Steam', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
