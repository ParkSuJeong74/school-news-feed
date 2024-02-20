import { SchoolInterface } from './school.interface';

export interface NewsInterface {
  id: number;
  content: string;
  schoolId: number;
  school: SchoolInterface;
  createdAt: Date;
}

export type RequestCreateNewsInterface = Pick<NewsInterface, 'content'>;
export type RequestUpdateNewsInterface = Pick<NewsInterface, 'content'>;
export type ResponseNewsInterface = Pick<
  NewsInterface,
  'content' | 'id' | 'schoolId' | 'createdAt'
>;
