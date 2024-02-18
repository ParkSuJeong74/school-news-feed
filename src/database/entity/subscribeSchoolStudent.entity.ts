import { SubscribeSchoolStudentInterface } from '@src/interface/subscribeSchoolStudent.interface';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { SchoolEntity } from './school.entity';
import { StudentEntity } from './student.entity';

@Entity('subscribe_school_student')
export class SubscribeSchoolStudent
  extends BasicEntity
  implements SubscribeSchoolStudentInterface
{
  @ManyToOne(() => SchoolEntity)
  @JoinColumn([{ name: 'school_id', referencedColumnName: 'id' }])
  school: SchoolEntity;
  @PrimaryColumn()
  schoolId: number;

  @ManyToOne(() => StudentEntity)
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: StudentEntity;
  @PrimaryColumn()
  studentId: number;
}
