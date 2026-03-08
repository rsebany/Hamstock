import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ShelfPayloadDto {
  @ApiProperty({ description: 'Measured distance from sensor to product (cm)' })
  @IsNumber()
  distance: number;

  @ApiProperty({
    description: 'Shelf occupancy status, e.g. PRODUCT PRESENT or EMPTY',
    example: 'PRODUCT PRESENT',
  })
  status: string;

  @ApiProperty({
    description: 'Whether this shelf is in alert state',
    example: false,
  })
  @IsBoolean()
  alert: boolean;
}

export class WarehouseUpdateDto {
  @ApiProperty({ type: ShelfPayloadDto })
  @ValidateNested()
  @Type(() => ShelfPayloadDto)
  Shelf1: ShelfPayloadDto;

  @ApiProperty({ type: ShelfPayloadDto })
  @ValidateNested()
  @Type(() => ShelfPayloadDto)
  Shelf2: ShelfPayloadDto;

  @ApiProperty({ type: ShelfPayloadDto })
  @ValidateNested()
  @Type(() => ShelfPayloadDto)
  Shelf3: ShelfPayloadDto;

  @ApiProperty({ type: ShelfPayloadDto })
  @ValidateNested()
  @Type(() => ShelfPayloadDto)
  Shelf4: ShelfPayloadDto;
}

