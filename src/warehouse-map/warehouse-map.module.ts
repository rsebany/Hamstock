import { Module } from '@nestjs/common';
import { WarehouseMapService } from './warehouse-map.service';

@Module({
  providers: [WarehouseMapService],
  exports: [WarehouseMapService],
})
export class WarehouseMapModule {}

