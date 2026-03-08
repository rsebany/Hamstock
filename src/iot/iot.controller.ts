import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IotService } from './iot.service';
import { WarehouseUpdateDto } from './dto/warehouse-update.dto';
import { SensorReadingDto } from './dto/sensor-reading.dto';
import { ShelfStatus } from '../entities/shelf-status.entity';
import { SensorData } from '../entities/sensor-data.entity';

@ApiTags('IoT & Gateway')
@Controller('warehouse')
export class IotController {
  constructor(private readonly iotService: IotService) {}

  @Post('update')
  @ApiBody({
    description:
      'Update shelf occupancy and alerts from the central gateway.',
    type: WarehouseUpdateDto,
  })
  @ApiCreatedResponse({
    description: 'Updated shelf status for all shelves',
    type: ShelfStatus,
    isArray: true,
  })
  updateWarehouse(@Body() dto: WarehouseUpdateDto) {
    return this.iotService.updateWarehouse(dto);
  }

  @Get('status')
  @ApiOkResponse({
    description: 'Latest status for all shelves',
    type: ShelfStatus,
    isArray: true,
  })
  getWarehouseStatus() {
    return this.iotService.getWarehouseStatus();
  }

  @Post('sensors')
  @ApiCreatedResponse({
    description: 'Store a new environmental sensor reading',
    type: SensorData,
  })
  recordSensor(@Body() dto: SensorReadingDto) {
    return this.iotService.recordSensorReading(dto);
  }

  @Get('sensors/latest/:zoneId')
  @ApiOkResponse({
    description:
      'Get the latest environmental sensor reading for a specific zone',
    type: SensorData,
  })
  getLatestSensor(@Param('zoneId', ParseIntPipe) zoneId: number) {
    return this.iotService.getLatestSensorReading(zoneId);
  }

  @Get('alarm/state')
  @ApiOkResponse({
    description:
      'Aggregated alarm state for the alarm ESP32 system (used to drive buzzer/LED).',
  })
  getAlarmState() {
    return this.iotService.getAlarmState();
  }
}

