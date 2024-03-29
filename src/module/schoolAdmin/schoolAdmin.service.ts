import { Injectable } from '@nestjs/common';
import { SchoolAdminEntity } from '@src/database/entity/schoolAdmin.entity';
import { plainToInstance } from 'class-transformer';
import { RequestCreateSchoolAdminDto } from './dto/requestSchoolAdmin.dto';
import { SchoolAdminRepository } from './schoolAdmin.repository';

@Injectable()
export class SchoolAdminService {
  async createSchoolAdmin(body: RequestCreateSchoolAdminDto) {
    try {
      await SchoolAdminRepository.save(
        plainToInstance(SchoolAdminEntity, body),
      );
    } catch (err) {
      throw new Error('관리자를 생성하지 못했습니다.');
    }
  }

  async findSchoolAdminList() {
    return await SchoolAdminRepository.find();
  }
}
