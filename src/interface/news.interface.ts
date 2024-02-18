import { SchoolInterface } from './school.interface';

export interface NewsInterface {
  id: number;
  content: string;
  schoolId: number;
  school: SchoolInterface;
}
