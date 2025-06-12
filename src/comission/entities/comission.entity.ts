import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('comissions')
export class Comission {
  @Column({ type: 'uuid', primary: true })
  id: string;

  @ManyToOne(() => User, { eager: true, cascade: true })
  barber: User;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  value: number;

  @Column({ type: 'timestamp' })
  date: Date;

  constructor(barber: User, value: number, date: Date) {
    this.barber = barber;
    this.value = value;
    this.date = date;
  }
}
