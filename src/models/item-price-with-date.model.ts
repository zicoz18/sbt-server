import { Entity, model, property, belongsTo } from '@loopback/repository';
import { ItemName } from './item-name.model';

@model()
export class ItemPriceWithDate extends Entity {
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
  price: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  date: Date;

  @belongsTo(() => ItemName)
  itemNameId: string;

  constructor(data?: Partial<ItemPriceWithDate>) {
    super(data);
  }
}

export interface ItemPriceWithDateRelations {
  // describe navigational properties here
}

export type ItemPriceWithDateWithRelations = ItemPriceWithDate & ItemPriceWithDateRelations;
