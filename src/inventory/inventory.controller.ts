import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Inventory')
@Controller('inventory/products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOkResponse({
    description: 'List all products in inventory',
    type: Product,
    isArray: true,
  })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get a single product by its id',
    type: Product,
  })
  @ApiNotFoundResponse({ description: 'Product not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create a new product',
    type: Product,
  })
  create(@Body() dto: CreateProductDto) {
    return this.inventoryService.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update an existing product',
    type: Product,
  })
  @ApiNotFoundResponse({ description: 'Product not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.inventoryService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Product deleted' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.inventoryService.remove(id);
  }
}

