import {
  AnyObject,
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
import moment from 'moment-timezone';
import {Products, Transactions} from '../models';
import {ProductsRepository} from '../repositories';
import {TransactionsRepository} from './../repositories/transactions.repository';

export class ProductsController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
    @repository(TransactionsRepository)
    public transactionsRepository: TransactionsRepository,
  ) {}

  @post('/products')
  @response(200, {
    description: 'Products model instance',
    content: {'application/json': {schema: getModelSchemaRef(Products)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {
            title: 'NewProducts',
            exclude: ['id'],
          }),
        },
      },
    })
    products: Omit<Products, 'id'>,
  ): Promise<Products> {
    return this.productsRepository.create(products);
  }

  @get('/products/count')
  @response(200, {
    description: 'Products model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Products) where?: Where<Products>): Promise<Count> {
    return this.productsRepository.count(where);
  }

  @get('/products')
  @response(200, {
    description: 'Array of Products model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Products, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Products) filter?: Filter<Products>,
  ): Promise<Products[]> {
    // GET Transaction of current month;
    const transactions: Transactions[] = await this.transactionsRepository.find(
      {
        where: {
          and: [
            {
              createdAt: {gte: moment().startOf('month').format()},
            },
            {
              createdAt: {lte: moment().endOf('month').format()},
            },
          ],
        },
      },
    );
    let products: Products | any[] = await this.productsRepository.find(filter);

    // Count sales per product
    products = products.map((product: Products) => {
      return {
        ...product,
        salesByMonth: transactions
          .filter((tran: Transactions) => tran.productId === product.id)
          .reduce(
            (acc: number, tran: Transactions) =>
              acc + tran.qty * tran.sellingCost,
            0,
          ),
      };
    });
    return products;
  }

  @get('/products/dropdown')
  @response(200, {
    description: 'Array of Products model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Products, {includeRelations: true}),
        },
      },
    },
  })
  async findDropdown(): Promise<Products[]> {
    // GET product name and id as dropdown response;
    return this.productsRepository.find({
      fields: ['id', 'name', 'cost'],
    });
  }

  @get('/products/sales')
  @response(200, {
    description: 'Array of Products model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Products, {includeRelations: true}),
        },
      },
    },
  })
  async findSales(): Promise<AnyObject> {
    // Get all transaction;
    const transactions: Transactions[] =
      await this.transactionsRepository.find();
    const products: Products[] = await this.productsRepository.find();

    const chartLabels: string[] = [],
      chartData: number[] = [];
    let salesPerProduct = 0;
    // Count sales per product and return chart labels and data as response.
    for (const product of products) {
      salesPerProduct = transactions
        .filter((tran: Transactions) => tran.productId === product.id)
        .reduce(
          (acc: number, tran: Transactions) =>
            acc + tran.qty * tran.sellingCost,
          0,
        );
      chartLabels.push(product.name);
      chartData.push(salesPerProduct);
    }
    return {chartLabels, chartData};
  }

  @patch('/products')
  @response(200, {
    description: 'Products PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Products,
    @param.where(Products) where?: Where<Products>,
  ): Promise<Count> {
    return this.productsRepository.updateAll(products, where);
  }

  @get('/products/{id}')
  @response(200, {
    description: 'Products model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Products, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Products, {exclude: 'where'})
    filter?: FilterExcludingWhere<Products>,
  ): Promise<Products> {
    return this.productsRepository.findById(id, filter);
  }

  @patch('/products/{id}')
  @response(204, {
    description: 'Products PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Products,
  ): Promise<void> {
    await this.productsRepository.updateById(id, products);
  }

  @put('/products/{id}')
  @response(204, {
    description: 'Products PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() products: Products,
  ): Promise<void> {
    await this.productsRepository.replaceById(id, products);
  }

  @del('/products/{id}')
  @response(204, {
    description: 'Products DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productsRepository.deleteById(id);
  }
}
