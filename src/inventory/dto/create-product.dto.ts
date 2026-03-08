import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Display name of the product' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Unique stock keeping unit for the product' })
  @IsString()
  sku: string;

  @ApiPropertyOptional({
    description: 'Current quantity available in stock',
    default: 0,
  })
  @IsInt()
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Optional expiry date in ISO 8601 format',
    type: String,
    example: '2026-12-31',
  })
  @IsDateString()
  @IsOptional()
  expiryDate?: string | null;

  @ApiPropertyOptional({ description: 'Optional category or family' })
  @IsString()
  @IsOptional()
  category?: string | null;

  @ApiPropertyOptional({
    description: 'Minimum recommended storage temperature (°C)',
  })
  @IsNumber()
  @IsOptional()
  minTemp?: number | null;

  @ApiPropertyOptional({
    description: 'Maximum recommended storage temperature (°C)',
  })
  @IsNumber()
  @IsOptional()
  maxTemp?: number | null;

  @ApiPropertyOptional({
    description: 'Minimum recommended storage humidity (%)',
  })
  @IsNumber()
  @IsOptional()
  minHumidity?: number | null;
}

