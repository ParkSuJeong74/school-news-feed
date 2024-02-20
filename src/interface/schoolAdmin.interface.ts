export interface SchoolAdminInterface {
  id: number;
  name: string;
}

export type RequestCreateSchoolAdminInterface = Pick<
  SchoolAdminInterface,
  'name'
>;

export type ResponseSchoolAdminInterface = Pick<
  SchoolAdminInterface,
  'id' | 'name'
>;
