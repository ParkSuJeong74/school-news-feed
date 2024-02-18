import { ApiProperty } from '@nestjs/swagger';
import { RequestCreateStudentInterface } from '@src/interface/student.interface';
import { IsNumber, IsString } from 'class-validator';

export class RequestCreateSchoolDto implements RequestCreateStudentInterface {
  @ApiProperty({
    description: '학교 이름',
    example: '클래스팅 대학',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '학교 지역',
    example: '중구',
  })
  @IsString()
  region: string;

  // TODO: 로그인 구현시 삭제
  @ApiProperty({
    description: '학교 관리자 ID',
    example: 1,
  })
  @IsNumber()
  schoolAdminId: number;
}
