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
import { ItemName } from '../models';
import { ItemNameRepository } from '../repositories';

export class ItemNameController {
  constructor(
    @repository(ItemNameRepository)
    public itemNameRepository: ItemNameRepository,
  ) { }

  @post('/item-names')
  @response(200, {
    description: 'ItemName model instance',
    content: { 'application/json': { schema: getModelSchemaRef(ItemName) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemName, {
            title: 'NewItemName',
            exclude: ['id'],
          }),
        },
      },
    })
    itemName: Omit<ItemName, 'id'>,
  ): Promise<ItemName> {
    return this.itemNameRepository.create(itemName);
  }

  @get('/item-names/count')
  @response(200, {
    description: 'ItemName model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(ItemName) where?: Where<ItemName>,
  ): Promise<Count> {
    return this.itemNameRepository.count(where);
  }

  @get('/item-names')
  @response(200, {
    description: 'Array of ItemName model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ItemName, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(ItemName) filter?: Filter<ItemName>,
  ): Promise<ItemName[]> {
    return this.itemNameRepository.find(filter);
  }

  @patch('/item-names')
  @response(200, {
    description: 'ItemName PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemName, { partial: true }),
        },
      },
    })
    itemName: ItemName,
    @param.where(ItemName) where?: Where<ItemName>,
  ): Promise<Count> {
    return this.itemNameRepository.updateAll(itemName, where);
  }

  @get('/item-names/{id}')
  @response(200, {
    description: 'ItemName model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ItemName, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ItemName, { exclude: 'where' }) filter?: FilterExcludingWhere<ItemName>
  ): Promise<ItemName> {
    return this.itemNameRepository.findById(id, filter);
  }

  @patch('/item-names/{id}')
  @response(204, {
    description: 'ItemName PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemName, { partial: true }),
        },
      },
    })
    itemName: ItemName,
  ): Promise<void> {
    await this.itemNameRepository.updateById(id, itemName);
  }

  @put('/item-names/{id}')
  @response(204, {
    description: 'ItemName PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() itemName: ItemName,
  ): Promise<void> {
    await this.itemNameRepository.replaceById(id, itemName);
  }

  @del('/item-names/{id}')
  @response(204, {
    description: 'ItemName DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.itemNameRepository.deleteById(id);
  }
}
