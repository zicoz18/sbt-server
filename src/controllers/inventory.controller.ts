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
  getWhereSchemaFor,
} from '@loopback/rest';
import { Inventory, InventoryItem } from '../models';
import { InventoryRepository } from '../repositories';

export class InventoryController {
  constructor(
    @repository(InventoryRepository)
    public inventoryRepository: InventoryRepository,
  ) { }

  @post('/inventories')
  @response(200, {
    description: 'Inventory model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Inventory) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventory, {
            title: 'NewInventory',
            exclude: ['id'],
          }),
        },
      },
    })
    inventory: Omit<Inventory, 'id'>,
  ): Promise<Inventory> {
    return this.inventoryRepository.create(inventory);
  }

  @get('/inventories/count')
  @response(200, {
    description: 'Inventory model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Inventory) where?: Where<Inventory>,
  ): Promise<Count> {
    return this.inventoryRepository.count(where);
  }

  @get('/inventories')
  @response(200, {
    description: 'Array of Inventory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Inventory, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Inventory) filter?: Filter<Inventory>,
  ): Promise<Inventory[]> {
    return this.inventoryRepository.find(filter);
  }

  @patch('/inventories')
  @response(200, {
    description: 'Inventory PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventory, { partial: true }),
        },
      },
    })
    inventory: Inventory,
    @param.where(Inventory) where?: Where<Inventory>,
  ): Promise<Count> {
    return this.inventoryRepository.updateAll(inventory, where);
  }

  @get('/inventories/{id}')
  @response(200, {
    description: 'Inventory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Inventory, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Inventory, { exclude: 'where' }) filter?: FilterExcludingWhere<Inventory>
  ): Promise<Inventory> {
    return this.inventoryRepository.findById(id, filter);
  }

  @patch('/inventories/{id}')
  @response(204, {
    description: 'Inventory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventory, { partial: true }),
        },
      },
    })
    inventory: Inventory,
  ): Promise<void> {
    await this.inventoryRepository.updateById(id, inventory);
  }

  @put('/inventories/{id}')
  @response(204, {
    description: 'Inventory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() inventory: Inventory,
  ): Promise<void> {
    await this.inventoryRepository.replaceById(id, inventory);
  }

  @del('/inventories/{id}')
  @response(204, {
    description: 'Inventory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inventoryRepository.deleteById(id);
  }
  //#region RELATION ENDPOINTS

  //#region Inventory hasMany InventoryItem
  @get('/inventories/{id}/inventory-items', {
    responses: {
      '200': {
        description: 'Array of Inventory has many InventoryItem',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(InventoryItem) },
          },
        },
      },
    },
  })
  async findInventoryItems(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<InventoryItem>,
  ): Promise<InventoryItem[]> {
    return this.inventoryRepository.inventoryItems(id).find(filter);
  }

  @post('/inventories/{id}/inventory-items', {
    responses: {
      '200': {
        description: 'Inventory model instance',
        content: { 'application/json': { schema: getModelSchemaRef(InventoryItem) } },
      },
    },
  })
  async createInventoryItem(
    @param.path.string('id') id: typeof Inventory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventoryItem, {
            title: 'NewInventoryItemInInventory',
            exclude: ['id'],
            optional: ['inventoryId']
          }),
        },
      },
    }) inventoryItem: Omit<InventoryItem, 'id'>,
  ): Promise<InventoryItem> {
    return this.inventoryRepository.inventoryItems(id).create(inventoryItem);
  }

  @patch('/inventories/{id}/inventory-items', {
    responses: {
      '200': {
        description: 'Inventory.InventoryItem PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patchInventoryItem(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventoryItem, { partial: true }),
        },
      },
    })
    inventoryItem: Partial<InventoryItem>,
    @param.query.object('where', getWhereSchemaFor(InventoryItem)) where?: Where<InventoryItem>,
  ): Promise<Count> {
    return this.inventoryRepository.inventoryItems(id).patch(inventoryItem, where);
  }

  @del('/inventories/{id}/inventory-items', {
    responses: {
      '200': {
        description: 'Inventory.InventoryItem DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async deleteInventoryItem(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InventoryItem)) where?: Where<InventoryItem>,
  ): Promise<Count> {
    return this.inventoryRepository.inventoryItems(id).delete(where);
  }
  //#endregion

  //#endregion
}
