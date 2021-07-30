import { Entity, model, property, belongsTo } from '@loopback/repository';
import { ItemName } from './item-name.model';
import { Inventory } from './inventory.model';

@model()
export class InventoryItem extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @belongsTo(() => ItemName)
  itemNameId: string;

  @belongsTo(() => Inventory)
  inventoryId: string;

  constructor(data?: Partial<InventoryItem>) {
    super(data);
  }
}

export interface InventoryItemRelations {
  itemName: ItemName
  // describe navigational properties here
}

export type InventoryItemWithRelations = InventoryItem & InventoryItemRelations;
