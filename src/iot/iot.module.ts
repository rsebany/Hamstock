import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IotController } from './iot.controller';
import { IotService } from './iot.service';
import { ShelfStatus } from '../entities/shelf-status.entity';
import { SensorData } from '../entities/sensor-data.entity';
import { Alert } from '../entities/alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShelfStatus, SensorData, Alert])],
  controllers: [IotController],
  providers: [IotService],
  exports: [IotService],
})
export class IotModule {}

