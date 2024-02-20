import { ApiProperty } from '@nestjs/swagger';
import { ResponseStudentInterface } from '@src/interface/student.interface';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseStudentDto implements ResponseStudentInterface {
  constructor(data: ResponseStudentInterface) {
    this.id = data.id;
    this.name = data.name;
  }

  static fromInterface(data: ResponseStudentInterface) {
    return new this(data);
  }
  static fromInterfaces(data: ResponseStudentInterface[]) {
    return data.map((d) => this.fromInterface(d));
  }

  @ApiProperty({
    description: '학생 ID',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: '학생 이름',
    example: '박수정',
  })
  @Expose()
  name: string;
}
