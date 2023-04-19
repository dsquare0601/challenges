import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Transactions} from '../models';
import {TransactionsRepository} from '../repositories';
import {ProductsRepository} from './../repositories/products.repository';

export class TransactionsController {
  constructor(
    @repository(TransactionsRepository)
    public transactionsRepository: TransactionsRepository,
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
  ) {}

  @post('/transactions')
  @response(200, {
    description: 'Transactions model instance',
    content: {'application/json': {schema: getModelSchemaRef(Transactions)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transactions, {
            title: 'NewTransactions',
            exclude: ['id'],
          }),
        },
      },
    })
    transactions: Omit<Transactions, 'id'>,
  ): Promise<Transactions> {
    return this.transactionsRepository.create(transactions);
  }

  @get('/transactions/count')
  @response(200, {
    description: 'Transactions model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Transactions) where?: Where<Transactions>,
  ): Promise<Count> {
    return this.transactionsRepository.count(where);
  }

  @get('/transactions')
  @response(200, {
    description: 'Array of Transactions model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Transactions, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Transactions) filter?: Filter<Transactions>,
  ): Promise<Transactions | any[]> {
    let transaction: Transactions | any[] =
      await this.transactionsRepository.find(filter);
    const productIds = [
      ...new Set(transaction.map((tran: Transactions) => tran.productId)),
    ];
    const productNames: any[] = await this.productsRepository.find({
      where: {id: {inq: productIds}},
      fields: ['id', 'name'],
    });

    transaction = transaction.map((trans: Transactions) => {
      return {
        ...trans,
        product:
          productNames.find((product: any) => product.id === trans.productId)
            ?.name || '',
      };
    });
    return transaction;
  }

  @patch('/transactions')
  @response(200, {
    description: 'Transactions PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transactions, {partial: true}),
        },
      },
    })
    transactions: Transactions,
    @param.where(Transactions) where?: Where<Transactions>,
  ): Promise<Count> {
    return this.transactionsRepository.updateAll(transactions, where);
  }

  @get('/transactions/{id}')
  @response(200, {
    description: 'Transactions model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Transactions, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Transactions, {exclude: 'where'})
    filter?: FilterExcludingWhere<Transactions>,
  ): Promise<Transactions> {
    return this.transactionsRepository.findById(id, filter);
  }

  @patch('/transactions/{id}')
  @response(204, {
    description: 'Transactions PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transactions, {partial: true}),
        },
      },
    })
    transactions: Transactions,
  ): Promise<void> {
    await this.transactionsRepository.updateById(id, transactions);
  }

  @put('/transactions/{id}')
  @response(204, {
    description: 'Transactions PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() transactions: Transactions,
  ): Promise<void> {
    await this.transactionsRepository.replaceById(id, transactions);
  }

  @del('/transactions/{id}')
  @response(204, {
    description: 'Transactions DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transactionsRepository.deleteById(id);
  }
}
