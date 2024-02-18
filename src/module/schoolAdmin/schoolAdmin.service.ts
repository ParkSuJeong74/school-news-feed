import { Injectable } from '@nestjs/common';
import { SchoolAdminRepository } from './schoolAdmin.repository';

@Injectable()
export class SchoolAdminService {
  async createSchoolAdmin(body: { name: string }) {
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
