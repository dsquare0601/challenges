import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Products} from './products.model';

@model({settings: {strict: false}})
export class Transactions extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  qty: number;

  @property({
    type: 'number',
    required: true,
  })
  sellingCost: number;

  @property({
    type: 'string',
    required: true,
  })
  note: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @belongsTo(() => Products)
  productId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Transactions>) {
    super(data);
  }
}

export interface TransactionsRelations {
  // describe navigational properties here
}

export type TransactionsWithRelations = Transactions & TransactionsRelations;
