import { Injectable } from '@nestjs/common';
import { RequestCreateSchoolAdminDto } from './dto/requestSchoolAdmin.dto';
import { SchoolAdminRepository } from './schoolAdmin.repository';

@Injectable()
export class SchoolAdminService {
  async createSchoolAdmin(body: RequestCreateSchoolAdminDto) {
    try {
      await SchoolAdminRepository.save(body);
    } catch (err) {
      throw new Error('관리자를 생성하지 못했습니다.');
    }
  }

  async findSchoolAdminList() {
    return await SchoolAdminRepository.find();
  }
}
