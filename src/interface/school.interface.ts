import { NewsInterface, ResponseNewsInterface } from './news.interface';

export interface SchoolInterface {
  id: number;
  name: string;
  region: string;
  news?: NewsInterface[];
}

export type ResponseSchoolInterface = Pick<
  SchoolInterface,
  'id' | 'name' | 'region'
>;
export type ResponseSchoolNewsInterface = Pick<
  SchoolInterface,
  'id' | 'name'
> & { news?: ResponseNewsInterface[] };
