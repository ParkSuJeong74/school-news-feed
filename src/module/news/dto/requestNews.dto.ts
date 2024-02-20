import { ApiProperty } from '@nestjs/swagger';
import {
  RequestCreateNewsInterface,
  RequestUpdateNewsInterface,
} from '@src/interface/news.interface';
import { IsString } from 'class-validator';

export class RequestCreateNewsDto implements RequestCreateNewsInterface {
  @ApiProperty({
    description: '소식 내용',
    example: '02.20 백엔드 과제 제출 요망',
  })
  @IsString()
  content: string;
}

export class RequestUpdateNewsDto implements RequestUpdateNewsInterface {
  @ApiProperty({
    description: '소식 내용',
    example: '02.20 백엔드 과제 제출 요망',
  })
  @IsString()
  content: string;
}
