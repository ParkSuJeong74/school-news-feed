import { ApiProperty } from '@nestjs/swagger';
import { RequestCreateSchoolAdminInterface } from '@src/interface/schoolAdmin.interface';
import { IsString } from 'class-validator';

export class RequestCreateSchoolAdminDto
  implements RequestCreateSchoolAdminInterface
{
  @ApiProperty({
    description: '관리자 이름',
    example: '클래스팅 학교 관리자',
  })
  @IsString()
  name: string;
}
