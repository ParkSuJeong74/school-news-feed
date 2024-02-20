import { SchoolInterface } from './school.interface';
import { StudentInterface } from './student.interface';

export interface SubscribeSchoolStudentInterface {
  schoolId: number;
  school: SchoolInterface;
  studentId: number;
  student: StudentInterface;
}

export type RequestCreateSubscribeSchoolStudentInterface = Pick<
  SubscribeSchoolStudentInterface,
  'schoolId' | 'studentId'
>;

export type ResponseSubscribeSchoolStudentInterface = Pick<
  SubscribeSchoolStudentInterface,
  'school'
>;
