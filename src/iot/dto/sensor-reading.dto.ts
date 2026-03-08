import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber } from 'class-validator';

export class SensorReadingDto {
  @ApiProperty({ description: 'Measured temperature in °C' })
  @IsNumber()
  temperature: number;

  @ApiProperty({ description: 'Measured humidity in %' })
  @IsNumber()
  humidity: number;

  @ApiProperty({ description: 'Numeric zone identifier' })
  @IsInt()
  zoneId: number;

  @ApiPropertyOptional({
    description:
      'Optional timestamp of measurement in ISO 8601 format. If omitted, the server time is used.',
    type: String,
  })
  @IsDateString()
  timestamp?: string;
}

