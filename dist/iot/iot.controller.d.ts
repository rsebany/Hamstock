import { IotService } from './iot.service';
import { WarehouseUpdateDto } from './dto/warehouse-update.dto';
import { SensorReadingDto } from './dto/sensor-reading.dto';
import { ShelfStatus } from '../entities/shelf-status.entity';
import { SensorData } from '../entities/sensor-data.entity';
export declare class IotController {
    private readonly iotService;
    constructor(iotService: IotService);
    updateWarehouse(dto: WarehouseUpdateDto): Promise<ShelfStatus[]>;
    getWarehouseStatus(): Promise<ShelfStatus[]>;
    recordSensor(dto: SensorReadingDto): Promise<SensorData>;
    getLatestSensor(zoneId: number): Promise<SensorData | null>;
    getAlarmState(): Promise<{
        anyActive: boolean;
        shelves: ShelfStatus[];
        activeAlerts: import("../entities/alert.entity").Alert[];
    }>;
}
