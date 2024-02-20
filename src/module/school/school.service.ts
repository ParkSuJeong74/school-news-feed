import { Injectable } from '@nestjs/common';
import { SchoolEntity } from '@src/database/entity/school.entity';
import { plainToInstance } from 'class-transformer';
import { RequestCreateSchoolDto } from './dto/requestSchool.dto';
import { SchoolRepository } from './school.repository';

@Injectable()
export class SchoolService {
  async createSchool(schoolAdminId: number, body: RequestCreateSchoolDto) {
    const school = await SchoolRepository.findOneBy({
      schoolAdminId,
    });
    if (school) {
      throw new Error('이미 관리 학교가 존재합니다.');
    }

    try {
      await SchoolRepository.save(
        plainToInstance(SchoolEntity, { schoolAdminId, ...body }),
      );
    } catch (err) {
      throw new Error('학교를 생성하지 못했습니다.');
    }
  }

  async findSchoolList() {
    return await SchoolRepository.find();
  }
}
