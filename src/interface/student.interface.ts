export interface StudentInterface {
  id: number;
  name: string;
}

export type RequestCreateStudentInterface = Pick<StudentInterface, 'name'>;
export type ResponseStudentInterface = Pick<StudentInterface, 'name' | 'id'>;
