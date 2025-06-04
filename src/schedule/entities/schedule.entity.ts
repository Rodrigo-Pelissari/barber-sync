import { User } from 'src/user/entities/user.entity';
import { Column, Entity } from 'typeorm';
import { serviceType } from '../enums/serviceType.enum';
import { Product } from 'src/product/entities/product.entity';

@Entity('schedules')
export class Schedule {
  @Column({ primary: true, type: 'uuid' })
  id: string;

  @Column()
  barber: User;

  @Column()
  customer: User;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'enum', enum: serviceType })
  type: serviceType;

  @Column()
  service: Product[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;
}
