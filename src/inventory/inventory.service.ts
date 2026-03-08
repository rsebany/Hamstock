import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.productsRepository.findOne({ where: { id } });
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create({
      ...dto,
      // DTO uses string for expiryDate to make validation / transport easier
      expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
    });
    return this.productsRepository.save(product);
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const toUpdate: Partial<Product> = {
      ...dto,
      expiryDate:
        dto.expiryDate !== undefined
          ? dto.expiryDate
            ? new Date(dto.expiryDate)
            : null
          : existing.expiryDate,
    };

    await this.productsRepository.update(id, toUpdate);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}

