import { ApiProperty } from '@nestjs/swagger';
import { ResponseSchoolInterface } from '@src/interface/school.interface';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseSchoolDto implements ResponseSchoolInterface {
  constructor(data: ResponseSchoolInterface) {
    this.id = data.id;
    this.name = data.name;
    this.region = data.region;
  }

  static fromInterface(data: ResponseSchoolInterface) {
    return new this(data);
  }
  static fromInterfaces(data: ResponseSchoolInterface[]) {
    return data.map((d) => this.fromInterface(d));
  }

  @ApiProperty({
    description: '학교 ID',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: '학교 이름',
    example: '클래스팅 학교',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: '학교 지역',
    example: '중구',
  })
  @Expose()
  region: string;
}
