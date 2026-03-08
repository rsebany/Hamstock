import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shelf_statuses')
export class ShelfStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shelfId: string;

  @Column({ type: 'float' })
  distance: number;

  @Column()
  status: string;

  @Column({ default: false })
  alert: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

