import { ApiProperty } from '@nestjs/swagger';
import { ResponseNewsInterface } from '@src/interface/news.interface';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class ResponseNewsFeedDto implements ResponseNewsInterface {
  constructor(data: ResponseNewsInterface) {
    this.id = data.id;
    this.content = data.content;
    this.schoolId = data.schoolId;
    this.createdAt = data.createdAt;
  }

  static fromInterface(data: ResponseNewsInterface) {
    return new this(data);
  }
  static fromInterfaces(data: ResponseNewsInterface[]) {
    return data.map((d) => this.fromInterface(d));
  }

  @ApiProperty({
    description: '소식 ID',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: '소식 내용',
    example: '02.20 백엔드 과제 제출 요망',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: '학교 ID',
    example: 1,
  })
  @IsNumber()
  schoolId: number;

  @ApiProperty({
    description: '소식 생성일자',
    example: '2024-02-18 14:29:50.335093+00',
  })
  @IsDateString()
  createdAt: Date;
}
