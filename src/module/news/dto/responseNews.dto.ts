import { ApiProperty } from '@nestjs/swagger';
import { ResponseNewsInterface } from '@src/interface/news.interface';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseNewsDto implements ResponseNewsInterface {
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
  @Expose()
  id: number;

  @ApiProperty({
    description: '소식 내용',
    example: '02.20 백엔드 과제 제출 요망',
  })
  @Expose()
  content: string;

  @ApiProperty({
    description: '학교 ID',
    example: 1,
  })
  @Expose()
  schoolId: number;

  @ApiProperty({
    description: '생성 날짜',
    example: '2024-02-18 14:54:47.011979+00',
  })
  @Expose()
  createdAt: Date;
}
