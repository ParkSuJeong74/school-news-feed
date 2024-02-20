import { ApiProperty } from '@nestjs/swagger';
import { ResponseSchoolAdminInterface } from '@src/interface/schoolAdmin.interface';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseSchoolAdminDto implements ResponseSchoolAdminInterface {
  constructor(data: ResponseSchoolAdminInterface) {
    this.id = data.id;
    this.name = data.name;
  }

  static fromInterface(data: ResponseSchoolAdminInterface) {
    return new this(data);
  }
  static fromInterfaces(data: ResponseSchoolAdminInterface[]) {
    return data.map((d) => this.fromInterface(d));
  }

  @ApiProperty({
    description: '관리자 ID',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: '관리자 이름',
    example: '클래스팅 학교 관리자',
  })
  @Expose()
  name: string;
}
