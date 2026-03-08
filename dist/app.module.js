"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const inventory_module_1 = require("./inventory/inventory.module");
const iot_module_1 = require("./iot/iot.module");
const ai_module_1 = require("./ai/ai.module");
const warehouse_map_module_1 = require("./warehouse-map/warehouse-map.module");
const product_entity_1 = require("./entities/product.entity");
const warehouse_zone_entity_1 = require("./entities/warehouse-zone.entity");
const sensor_data_entity_1 = require("./entities/sensor-data.entity");
const alert_entity_1 = require("./entities/alert.entity");
const user_entity_1 = require("./entities/user.entity");
const shelf_status_entity_1 = require("./entities/shelf-status.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST', 'localhost'),
                    port: parseInt(config.get('DB_PORT', '5432'), 10),
                    username: config.get('DB_USER', 'postgres'),
                    password: config.get('DB_PASSWORD', 'postgres'),
                    database: config.get('DB_NAME', 'hamstock'),
                    entities: [product_entity_1.Product, warehouse_zone_entity_1.WarehouseZone, sensor_data_entity_1.SensorData, alert_entity_1.Alert, user_entity_1.User, shelf_status_entity_1.ShelfStatus],
                    synchronize: true,
                }),
            }),
            auth_module_1.AuthModule,
            inventory_module_1.InventoryModule,
            iot_module_1.IotModule,
            ai_module_1.AiModule,
            warehouse_map_module_1.WarehouseMapModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map