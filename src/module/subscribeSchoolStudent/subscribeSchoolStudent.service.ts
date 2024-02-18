import { Injectable } from '@nestjs/common';
import { SubscribeSchoolStudentEntity } from '@src/database/entity/subscribeSchoolStudent.entity';
import { plainToInstance } from 'class-transformer';
import { SchoolRepository } from '../school/school.repository';
import { StudentRepository } from '../student/student.repository';
import { RequestCreateSubscribeSchoolStudentDto } from './dto/requestSubscribeSchoolStudent.dto';
import { SubscribeSchoolStudentRepository } from './subscribeSchoolStudent.repository';

@Injectable()
export class SubscribeSchoolStudentService {
  async createSubscribe(body: RequestCreateSubscribeSchoolStudentDto) {
    await this.validateSchoolAndStudent(body);
    await this.isExistSubscribe(body);
    try {
      await SubscribeSchoolStudentRepository.save(
        plainToInstance(SubscribeSchoolStudentEntity, body),
      );
    } catch (err) {
      throw new Error('구독하지 못했습니다.');
    }
  }

  async isExistSubscribe(body: RequestCreateSubscribeSchoolStudentDto) {
    const subscribe = await SubscribeSchoolStudentRepository.findOneBy({
      schoolId: body.schoolId,
      studentId: body.studentId,
    });
    if (subscribe) {
      throw new Error('이미 구독 중인 학교 페이지입니다.');
    }
  }

  async validateSchoolAndStudent(body: RequestCreateSubscribeSchoolStudentDto) {
    const student = await StudentRepository.findOneBy({ id: body.studentId });
    const school = await SchoolRepository.findOneBy({ id: body.schoolId });

    if (!student || !school) {
      throw new Error('존재하지 않는 학생이거나 학교 페이지입니다.');
    }
  }

  async findSchoolList() {
    return await SubscribeSchoolStudentRepository.find({
      where: { studentId: 1 }, // TODO: 로그인 구현 후 수정
      relations: ['school'],
    });
  }

  async findNewsList(studentId: number) {
    const subscribeList = await SubscribeSchoolStudentRepository.find({
      where: { studentId },
      relations: ['school'],
    });

    return await Promise.all(
      subscribeList.map((sub) => {
        return SchoolRepository.findOne({
          where: { id: sub.schoolId },
          relations: ['news'],
        });
      }),
    );
  }

  async deleteSubscribe(body: RequestCreateSubscribeSchoolStudentDto) {
    await this.validateSchoolAndStudent(body);
    const deleteResult = await SubscribeSchoolStudentRepository.delete(
      plainToInstance(SubscribeSchoolStudentEntity, body),
    );

    if (deleteResult.affected === 0) {
      throw new Error('구독 취소하지 못했습니다.');
    }
  }
}
