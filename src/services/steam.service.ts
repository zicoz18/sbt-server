import { inject, Provider } from '@loopback/core';
import { getService } from '@loopback/service-proxy';
import { SteamDataSource } from '../datasources';

export interface SteamService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  // getItemInfo(): Promise<any>;
  getItemInfo(itemName: string): Promise<any>;
}

export class SteamProvider implements Provider<SteamService> {
  constructor(
    // Steam must match the name property in the datasource json file
    @inject('datasources.Steam')
    protected dataSource: SteamDataSource = new SteamDataSource(),
  ) { }

  value(): Promise<SteamService> {
    return getService(this.dataSource);
  }
}
