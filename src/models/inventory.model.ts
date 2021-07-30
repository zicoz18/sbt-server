import { Entity, model, property, hasMany } from '@loopback/repository';
import { InventoryItem } from './inventory-item.model';

@model()
export class Inventory extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => InventoryItem)
  inventoryItems: InventoryItem[];

  constructor(data?: Partial<Inventory>) {
    super(data);
  }
}

export interface InventoryRelations {
  // describe navigational properties here
}

export type InventoryWithRelations = Inventory & InventoryRelations;
