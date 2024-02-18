export interface SchoolInterface {
  id: number;
  name: string;
  region: string;
}

export type ResponseSchoolInterface = Pick<
  SchoolInterface,
  'id' | 'name' | 'region'
>;
