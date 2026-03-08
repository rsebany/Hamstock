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
exports.IotService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shelf_status_entity_1 = require("../entities/shelf-status.entity");
const sensor_data_entity_1 = require("../entities/sensor-data.entity");
const alert_entity_1 = require("../entities/alert.entity");
let IotService = class IotService {
    constructor(shelfStatusRepository, sensorDataRepository, alertRepository) {
        this.shelfStatusRepository = shelfStatusRepository;
        this.sensorDataRepository = sensorDataRepository;
        this.alertRepository = alertRepository;
    }
    async updateWarehouse(dto) {
        const shelves = [
            ['Shelf1', dto.Shelf1],
            ['Shelf2', dto.Shelf2],
            ['Shelf3', dto.Shelf3],
            ['Shelf4', dto.Shelf4],
        ];
        const result = [];
        for (const [shelfId, payload] of shelves) {
            if (!payload) {
                continue;
            }
            let shelf = await this.shelfStatusRepository.findOne({
                where: { shelfId },
            });
            if (!shelf) {
                shelf = this.shelfStatusRepository.create({
                    shelfId,
                    distance: payload.distance,
                    status: payload.status,
                    alert: payload.alert,
                });
            }
            else {
                shelf.distance = payload.distance;
                shelf.status = payload.status;
                shelf.alert = payload.alert;
            }
            const saved = await this.shelfStatusRepository.save(shelf);
            result.push(saved);
            if (payload.alert) {
                const alert = this.alertRepository.create({
                    type: alert_entity_1.AlertType.ENVIRONMENT,
                    severity: 'HIGH',
                    message: `${shelfId} reported an alert (status: ${payload.status}, distance: ${payload.distance})`,
                });
                await this.alertRepository.save(alert);
            }
        }
        return result;
    }
    async getWarehouseStatus() {
        return this.shelfStatusRepository.find({
            order: { shelfId: 'ASC' },
        });
    }
    async recordSensorReading(dto) {
        const data = this.sensorDataRepository.create({
            temperature: dto.temperature,
            humidity: dto.humidity,
            timestamp: dto.timestamp ? new Date(dto.timestamp) : new Date(),
            zoneId: dto.zoneId,
        });
        return this.sensorDataRepository.save(data);
    }
    async getLatestSensorReading(zoneId) {
        return this.sensorDataRepository.findOne({
            where: { zoneId },
            order: { timestamp: 'DESC' },
        });
    }
    async getAlarmState() {
        const shelves = await this.getWarehouseStatus();
        const activeAlerts = await this.alertRepository.find({
            where: { resolved: false },
            order: { createdAt: 'DESC' },
        });
        const anyActive = shelves.some((s) => s.alert) || activeAlerts.length > 0;
        return {
            anyActive,
            shelves,
            activeAlerts,
        };
    }
};
exports.IotService = IotService;
exports.IotService = IotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shelf_status_entity_1.ShelfStatus)),
    __param(1, (0, typeorm_1.InjectRepository)(sensor_data_entity_1.SensorData)),
    __param(2, (0, typeorm_1.InjectRepository)(alert_entity_1.Alert)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], IotService);
//# sourceMappingURL=iot.service.js.map