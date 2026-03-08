import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  sku: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'date', nullable: true })
  expiryDate: Date | null;

  @Column({ type: 'varchar', nullable: true })
  category: string | null;

  @Column({ type: 'float', nullable: true })
  minTemp: number | null;

  @Column({ type: 'float', nullable: true })
  maxTemp: number | null;

  @Column({ type: 'float', nullable: true })
  minHumidity: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

