import { Entity, model, property } from '@loopback/repository';

@model()
export class ItemName extends Entity {
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
  market_hash_name: string;


  constructor(data?: Partial<ItemName>) {
    super(data);
  }
}

export interface ItemNameRelations {
  // describe navigational properties here
}

export type ItemNameWithRelations = ItemName & ItemNameRelations;
