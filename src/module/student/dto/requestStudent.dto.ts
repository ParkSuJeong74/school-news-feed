import { ApiProperty } from '@nestjs/swagger';
import { RequestCreateStudentInterface } from '@src/interface/student.interface';
import { IsString } from 'class-validator';

export class RequestCreateStudentDto implements RequestCreateStudentInterface {
  @ApiProperty({
    description: '학생 이름',
    example: '박수정',
  })
  @IsString()
  name: string;
}
