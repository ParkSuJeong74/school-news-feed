import { ApiProperty } from '@nestjs/swagger';
import {
  RequestCreateNewsInterface,
  RequestUpdateNewsInterface,
} from '@src/interface/news.interface';
import { IsNumber, IsString } from 'class-validator';

export class RequestCreateNewsDto implements RequestCreateNewsInterface {
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

  // TODO: 로그인 기능 개발시 삭제
  @ApiProperty({
    description: '학교 관리자 ID',
    example: 1,
  })
  @IsNumber()
  schoolAdminId: number;
}

export class RequestUpdateNewsDto implements RequestUpdateNewsInterface {
  @ApiProperty({
    description: '소식 내용',
    example: '02.20 백엔드 과제 제출 요망',
  })
  @IsString()
  content: string;

  // TODO: 로그인 기능 개발시 삭제
  @ApiProperty({
    description: '학교 관리자 ID',
    example: 1,
  })
  @IsNumber()
  schoolAdminId: number;
}
