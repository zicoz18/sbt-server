import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { ItemName, ItemPriceWithDate } from '../models';
import { ItemPriceWithDateRepository } from '../repositories';

export class ItemPriceWithDateController {
  constructor(
    @repository(ItemPriceWithDateRepository)
    public itemPriceWithDateRepository: ItemPriceWithDateRepository,
  ) { }

  @post('/item-price-with-dates')
  @response(200, {
    description: 'ItemPriceWithDate model instance',
    content: { 'application/json': { schema: getModelSchemaRef(ItemPriceWithDate) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPriceWithDate, {
            title: 'NewItemPriceWithDate',
            exclude: ['id'],
          }),
        },
      },
    })
    itemPriceWithDate: Omit<ItemPriceWithDate, 'id'>,
  ): Promise<ItemPriceWithDate> {
    return this.itemPriceWithDateRepository.create(itemPriceWithDate);
  }

  @get('/item-price-with-dates/count')
  @response(200, {
    description: 'ItemPriceWithDate model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(ItemPriceWithDate) where?: Where<ItemPriceWithDate>,
  ): Promise<Count> {
    return this.itemPriceWithDateRepository.count(where);
  }

  @get('/item-price-with-dates')
  @response(200, {
    description: 'Array of ItemPriceWithDate model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ItemPriceWithDate, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(ItemPriceWithDate) filter?: Filter<ItemPriceWithDate>,
  ): Promise<ItemPriceWithDate[]> {
    return this.itemPriceWithDateRepository.find(filter);
  }

  @patch('/item-price-with-dates')
  @response(200, {
    description: 'ItemPriceWithDate PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPriceWithDate, { partial: true }),
        },
      },
    })
    itemPriceWithDate: ItemPriceWithDate,
    @param.where(ItemPriceWithDate) where?: Where<ItemPriceWithDate>,
  ): Promise<Count> {
    return this.itemPriceWithDateRepository.updateAll(itemPriceWithDate, where);
  }

  @get('/item-price-with-dates/{id}')
  @response(200, {
    description: 'ItemPriceWithDate model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ItemPriceWithDate, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ItemPriceWithDate, { exclude: 'where' }) filter?: FilterExcludingWhere<ItemPriceWithDate>
  ): Promise<ItemPriceWithDate> {
    return this.itemPriceWithDateRepository.findById(id, filter);
  }

  @patch('/item-price-with-dates/{id}')
  @response(204, {
    description: 'ItemPriceWithDate PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPriceWithDate, { partial: true }),
        },
      },
    })
    itemPriceWithDate: ItemPriceWithDate,
  ): Promise<void> {
    await this.itemPriceWithDateRepository.updateById(id, itemPriceWithDate);
  }

  @put('/item-price-with-dates/{id}')
  @response(204, {
    description: 'ItemPriceWithDate PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() itemPriceWithDate: ItemPriceWithDate,
  ): Promise<void> {
    await this.itemPriceWithDateRepository.replaceById(id, itemPriceWithDate);
  }

  @del('/item-price-with-dates/{id}')
  @response(204, {
    description: 'ItemPriceWithDate DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.itemPriceWithDateRepository.deleteById(id);
  }

  //#region RELATION ENDPOINTS

  //#region ItemPriceWithDate belongsTo ItemName 
  @get('/item-price-with-dates/{id}/item-name', {
    responses: {
      '200': {
        description: 'ItemName belonging to ItemPriceWithDate',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(ItemName) },
          },
        },
      },
    },
  })
  async getItemName(
    @param.path.string('id') id: typeof ItemPriceWithDate.prototype.id,
  ): Promise<ItemName> {
    return this.itemPriceWithDateRepository.itemName(id);
  }
  //#endregion

  //#endregion
}
