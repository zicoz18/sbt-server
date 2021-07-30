import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Inventory } from './inventory.model';

@model()
export class InventoryWithDate extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  date: Date;

  @property({
    type: 'number',
    required: true,
  })
  balance: number;

  @belongsTo(() => Inventory)
  inventoryId: string;

  constructor(data?: Partial<InventoryWithDate>) {
    super(data);
  }
}

export interface InventoryWithDateRelations {
  // describe navigational properties here
}

export type InventoryWithDateWithRelations = InventoryWithDate & InventoryWithDateRelations;
