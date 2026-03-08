import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShelfStatus } from '../entities/shelf-status.entity';
import { WarehouseUpdateDto, ShelfPayloadDto } from './dto/warehouse-update.dto';
import { SensorData } from '../entities/sensor-data.entity';
import { SensorReadingDto } from './dto/sensor-reading.dto';
import { Alert, AlertType } from '../entities/alert.entity';

@Injectable()
export class IotService {
  constructor(
    @InjectRepository(ShelfStatus)
    private readonly shelfStatusRepository: Repository<ShelfStatus>,
    @InjectRepository(SensorData)
    private readonly sensorDataRepository: Repository<SensorData>,
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  async updateWarehouse(dto: WarehouseUpdateDto): Promise<ShelfStatus[]> {
    const shelves: Array<[string, ShelfPayloadDto]> = [
      ['Shelf1', dto.Shelf1],
      ['Shelf2', dto.Shelf2],
      ['Shelf3', dto.Shelf3],
      ['Shelf4', dto.Shelf4],
    ];

    const result: ShelfStatus[] = [];

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
      } else {
        shelf.distance = payload.distance;
        shelf.status = payload.status;
        shelf.alert = payload.alert;
      }

      const saved = await this.shelfStatusRepository.save(shelf);
      result.push(saved);

      if (payload.alert) {
        const alert = this.alertRepository.create({
          type: AlertType.ENVIRONMENT,
          severity: 'HIGH',
          message: `${shelfId} reported an alert (status: ${payload.status}, distance: ${payload.distance})`,
        });
        await this.alertRepository.save(alert);
      }
    }

    return result;
  }

  async getWarehouseStatus(): Promise<ShelfStatus[]> {
    return this.shelfStatusRepository.find({
      order: { shelfId: 'ASC' },
    });
  }

  async recordSensorReading(dto: SensorReadingDto): Promise<SensorData> {
    const data = this.sensorDataRepository.create({
      temperature: dto.temperature,
      humidity: dto.humidity,
      timestamp: dto.timestamp ? new Date(dto.timestamp) : new Date(),
      zoneId: dto.zoneId,
    });

    return this.sensorDataRepository.save(data);
  }

  async getLatestSensorReading(
    zoneId: number,
  ): Promise<SensorData | null> {
    return this.sensorDataRepository.findOne({
      where: { zoneId },
      order: { timestamp: 'DESC' },
    });
  }

  async getAlarmState(): Promise<{
    anyActive: boolean;
    shelves: ShelfStatus[];
    activeAlerts: Alert[];
  }> {
    const shelves = await this.getWarehouseStatus();
    const activeAlerts = await this.alertRepository.find({
      where: { resolved: false },
      order: { createdAt: 'DESC' },
    });

    const anyActive =
      shelves.some((s) => s.alert) || activeAlerts.length > 0;

    return {
      anyActive,
      shelves,
      activeAlerts,
    };
  }
}

