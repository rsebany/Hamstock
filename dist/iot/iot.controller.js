"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const iot_service_1 = require("./iot.service");
const warehouse_update_dto_1 = require("./dto/warehouse-update.dto");
const sensor_reading_dto_1 = require("./dto/sensor-reading.dto");
const shelf_status_entity_1 = require("../entities/shelf-status.entity");
const sensor_data_entity_1 = require("../entities/sensor-data.entity");
let IotController = class IotController {
    constructor(iotService) {
        this.iotService = iotService;
    }
    updateWarehouse(dto) {
        return this.iotService.updateWarehouse(dto);
    }
    getWarehouseStatus() {
        return this.iotService.getWarehouseStatus();
    }
    recordSensor(dto) {
        return this.iotService.recordSensorReading(dto);
    }
    getLatestSensor(zoneId) {
        return this.iotService.getLatestSensorReading(zoneId);
    }
    getAlarmState() {
        return this.iotService.getAlarmState();
    }
};
exports.IotController = IotController;
__decorate([
    (0, common_1.Post)('update'),
    (0, swagger_1.ApiBody)({
        description: 'Update shelf occupancy and alerts from the central gateway.',
        type: warehouse_update_dto_1.WarehouseUpdateDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Updated shelf status for all shelves',
        type: shelf_status_entity_1.ShelfStatus,
        isArray: true,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouse_update_dto_1.WarehouseUpdateDto]),
    __metadata("design:returntype", void 0)
], IotController.prototype, "updateWarehouse", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Latest status for all shelves',
        type: shelf_status_entity_1.ShelfStatus,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IotController.prototype, "getWarehouseStatus", null);
__decorate([
    (0, common_1.Post)('sensors'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Store a new environmental sensor reading',
        type: sensor_data_entity_1.SensorData,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sensor_reading_dto_1.SensorReadingDto]),
    __metadata("design:returntype", void 0)
], IotController.prototype, "recordSensor", null);
__decorate([
    (0, common_1.Get)('sensors/latest/:zoneId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get the latest environmental sensor reading for a specific zone',
        type: sensor_data_entity_1.SensorData,
    }),
    __param(0, (0, common_1.Param)('zoneId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IotController.prototype, "getLatestSensor", null);
__decorate([
    (0, common_1.Get)('alarm/state'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Aggregated alarm state for the alarm ESP32 system (used to drive buzzer/LED).',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IotController.prototype, "getAlarmState", null);
exports.IotController = IotController = __decorate([
    (0, swagger_1.ApiTags)('IoT & Gateway'),
    (0, common_1.Controller)('warehouse'),
    __metadata("design:paramtypes", [iot_service_1.IotService])
], IotController);
//# sourceMappingURL=iot.controller.js.map