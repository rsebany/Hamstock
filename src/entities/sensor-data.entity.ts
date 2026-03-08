import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('sensor_data')
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  temperature: number;

  @Column({ type: 'float' })
  humidity: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'int' })
  zoneId: number;

  @CreateDateColumn()
  createdAt: Date;
}

