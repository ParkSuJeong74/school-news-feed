import { ApiProperty } from '@nestjs/swagger';
import { RequestUpdateNewsInterface } from '@src/interface/news.interface';
import { RequestCreateSubscribeSchoolStudentInterface } from '@src/interface/subscribeSchoolStudent.interface';
import { IsNumber, IsString } from 'class-validator';

export class RequestCreateSubscribeSchoolStudentDto
  implements RequestCreateSubscribeSchoolStudentInterface
{
  @ApiProperty({
    description: '학교 ID',
    example: 1,
  })
  @IsNumber()
  schoolId: number;

  @ApiProperty({
    description: '학생 ID',
    example: 1,
  })
  @IsNumber()
  studentId: number;
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
