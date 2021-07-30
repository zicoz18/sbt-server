import { Entity, model, property } from '@loopback/repository';

@model()
export class Item extends Entity {
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
  market_hash_name: string

  @property({
    type: 'string',
    required: true,
  })
  median_price: string;

  @property({
    type: 'string',
    required: true,
  })
  volume: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  priceDate: Date;

  @property({
    type: 'number',
    required: true
  })
  amount: number

  @property({
    type: 'number',
    required: true
  })
  totalWorth: number

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
