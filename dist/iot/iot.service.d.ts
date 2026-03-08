import { Repository } from 'typeorm';
import { ShelfStatus } from '../entities/shelf-status.entity';
import { WarehouseUpdateDto } from './dto/warehouse-update.dto';
import { SensorData } from '../entities/sensor-data.entity';
import { SensorReadingDto } from './dto/sensor-reading.dto';
import { Alert } from '../entities/alert.entity';
export declare class IotService {
    private readonly shelfStatusRepository;
    private readonly sensorDataRepository;
    private readonly alertRepository;
    constructor(shelfStatusRepository: Repository<ShelfStatus>, sensorDataRepository: Repository<SensorData>, alertRepository: Repository<Alert>);
    updateWarehouse(dto: WarehouseUpdateDto): Promise<ShelfStatus[]>;
    getWarehouseStatus(): Promise<ShelfStatus[]>;
    recordSensorReading(dto: SensorReadingDto): Promise<SensorData>;
    getLatestSensorReading(zoneId: number): Promise<SensorData | null>;
    getAlarmState(): Promise<{
        anyActive: boolean;
        shelves: ShelfStatus[];
        activeAlerts: Alert[];
    }>;
}
