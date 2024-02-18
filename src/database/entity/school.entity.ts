import { SchoolInterface } from '@src/interface/school.interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicEntity } from './basic.entity';
import { SchoolAdminEntity } from './schoolAdmin.entity';

@Entity('school')
export class SchoolEntity extends BasicEntity implements SchoolInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  region: string;

  @OneToOne(() => SchoolAdminEntity)
  @JoinColumn([{ name: 'school_admin_id', referencedColumnName: 'id' }])
  schoolAdmin: SchoolAdminEntity;
  @Column()
  schoolAdminId: number;
}
