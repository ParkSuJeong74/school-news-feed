import { SchoolInterface } from '@src/interface/school.interface';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';

@Entity('student')
export class StudentEntity extends BasicEntity implements SchoolInterface {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
