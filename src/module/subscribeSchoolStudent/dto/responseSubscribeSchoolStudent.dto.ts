import { ApiProperty } from '@nestjs/swagger';
import { ResponseSchoolNewsInterface } from '@src/interface/school.interface';
import { ResponseSubscribeSchoolStudentInterface } from '@src/interface/subscribeSchoolStudent.interface';
import { ResponseNewsDto } from '@src/module/news/dto/responseNews.dto';
import { ResponseSchoolDto } from '@src/module/school/dto/responseSchool.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseSubscribeSchoolStudentDto
  implements ResponseSubscribeSchoolStudentInterface
{
  constructor(data: ResponseSubscribeSchoolStudentInterface) {
    this.school = ResponseSchoolDto.fromInterface(data.school);
  }

  static fromInterface(data: ResponseSubscribeSchoolStudentInterface) {
    return new this(data);
  }

  static fromInterfaces(data: ResponseSubscribeSchoolStudentInterface[]) {
    return data.map((d) => this.fromInterface(d));
  }

  @ApiProperty({
    description: '학교 정보',
    example: 1,
  })
  @Expose()
  school: ResponseSchoolDto;
}

@Exclude()
export class ResponseSubscribeSchoolNewsDto
  implements ResponseSchoolNewsInterface
{
  constructor(data: ResponseSchoolNewsInterface) {
    this.id = data.id;
    this.name = data.name;
    this.news = ResponseNewsDto.fromInterfaces(data.news);
  }

  static fromInterface(data: ResponseSchoolNewsInterface) {
    return new this(data);
  }

  static fromInterfaces(data: ResponseSchoolNewsInterface[]) {
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
    description: '학교 이름',
    example: '클래스팅 학교',
  })
  @Expose()
  news: ResponseNewsDto[];
}
