import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('warehouse_zones')
export class WarehouseZone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  floor: number;

  @Column()
  section: string;

  @Column({ type: 'float' })
  coordinateX: number;

  @Column({ type: 'float' })
  coordinateY: number;

  @Column({ type: 'float' })
  coordinateZ: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

