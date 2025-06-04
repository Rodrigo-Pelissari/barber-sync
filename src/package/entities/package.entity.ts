import { Schedule } from 'src/schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity } from 'typeorm';

@Entity('packages')
export class Package {
  @Column({ primary: true, type: 'uuid' })
  id: string;

  @Column()
  customer: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column()
  usedServices: Schedule[];
}
