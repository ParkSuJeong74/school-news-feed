import { StudentInterface } from '@src/interface/student.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';

@Entity('student')
export class StudentEntity extends BasicEntity implements StudentInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
