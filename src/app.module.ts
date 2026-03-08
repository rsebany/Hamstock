import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { IotModule } from './iot/iot.module';
import { AiModule } from './ai/ai.module';
import { WarehouseMapModule } from './warehouse-map/warehouse-map.module';
import { Product } from './entities/product.entity';
import { WarehouseZone } from './entities/warehouse-zone.entity';
import { SensorData } from './entities/sensor-data.entity';
import { Alert } from './entities/alert.entity';
import { User } from './entities/user.entity';
import { ShelfStatus } from './entities/shelf-status.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '5432'), 10),
        username: config.get<string>('DB_USER', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        database: config.get<string>('DB_NAME', 'hamstock'),
        entities: [Product, WarehouseZone, SensorData, Alert, User, ShelfStatus],
        synchronize: true,
      }),
    }),
    AuthModule,
    InventoryModule,
    IotModule,
    AiModule,
    WarehouseMapModule,
  ],
})
export class AppModule {}

