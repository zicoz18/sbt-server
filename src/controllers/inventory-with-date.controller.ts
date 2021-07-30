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
import { Inventory, InventoryWithDate } from '../models';
import { InventoryWithDateRepository } from '../repositories';

export class InventoryWithDateController {
  constructor(
    @repository(InventoryWithDateRepository)
    public inventoryWithDateRepository: InventoryWithDateRepository,
  ) { }

  @post('/inventory-with-dates')
  @response(200, {
    description: 'InventoryWithDate model instance',
    content: { 'application/json': { schema: getModelSchemaRef(InventoryWithDate) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventoryWithDate, {
            title: 'NewInventoryWithDate',
            exclude: ['id'],
          }),
        },
      },
    })
    inventoryWithDate: Omit<InventoryWithDate, 'id'>,
  ): Promise<InventoryWithDate> {
    return this.inventoryWithDateRepository.create(inventoryWithDate);
  }

  @get('/inventory-with-dates/count')
  @response(200, {
    description: 'InventoryWithDate model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(InventoryWithDate) where?: Where<InventoryWithDate>,
  ): Promise<Count> {
    return this.inventoryWithDateRepository.count(where);
  }

  @get('/inventory-with-dates')
  @response(200, {
    description: 'Array of InventoryWithDate model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InventoryWithDate, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(InventoryWithDate) filter?: Filter<InventoryWithDate>,
  ): Promise<InventoryWithDate[]> {
    return this.inventoryWithDateRepository.find(filter);
  }

  @patch('/inventory-with-dates')
  @response(200, {
    description: 'InventoryWithDate PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventoryWithDate, { partial: true }),
        },
      },
    })
    inventoryWithDate: InventoryWithDate,
    @param.where(InventoryWithDate) where?: Where<InventoryWithDate>,
  ): Promise<Count> {
    return this.inventoryWithDateRepository.updateAll(inventoryWithDate, where);
  }

  @get('/inventory-with-dates/{id}')
  @response(200, {
    description: 'InventoryWithDate model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InventoryWithDate, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InventoryWithDate, { exclude: 'where' }) filter?: FilterExcludingWhere<InventoryWithDate>
  ): Promise<InventoryWithDate> {
    return this.inventoryWithDateRepository.findById(id, filter);
  }

  @patch('/inventory-with-dates/{id}')
  @response(204, {
    description: 'InventoryWithDate PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventoryWithDate, { partial: true }),
        },
      },
    })
    inventoryWithDate: InventoryWithDate,
  ): Promise<void> {
    await this.inventoryWithDateRepository.updateById(id, inventoryWithDate);
  }

  @put('/inventory-with-dates/{id}')
  @response(204, {
    description: 'InventoryWithDate PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() inventoryWithDate: InventoryWithDate,
  ): Promise<void> {
    await this.inventoryWithDateRepository.replaceById(id, inventoryWithDate);
  }

  @del('/inventory-with-dates/{id}')
  @response(204, {
    description: 'InventoryWithDate DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inventoryWithDateRepository.deleteById(id);
  }

  //#region RELATION ENDPOINTS

  //#region InventoryWithDate belongsTo Inventory
  @get('/inventory-with-dates/{id}/inventory', {
    responses: {
      '200': {
        description: 'Inventory belonging to InventoryWithDate',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Inventory) },
          },
        },
      },
    },
  })
  async getInventory(
    @param.path.string('id') id: typeof InventoryWithDate.prototype.id,
  ): Promise<Inventory> {
    return this.inventoryWithDateRepository.inventory(id);
  }
  //#endregion

  //#endregion
}
