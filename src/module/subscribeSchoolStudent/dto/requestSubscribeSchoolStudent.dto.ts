import { ApiProperty } from '@nestjs/swagger';
import { RequestCreateSubscribeSchoolStudentInterface } from '@src/interface/subscribeSchoolStudent.interface';
import { IsNumber } from 'class-validator';

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
