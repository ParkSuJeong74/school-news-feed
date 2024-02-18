import { SchoolInterface } from '@src/interface/school.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';

@Entity('student')
export class StudentEntity extends BasicEntity implements SchoolInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
