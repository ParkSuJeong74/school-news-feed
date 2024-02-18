import { Injectable } from '@nestjs/common';
import { RequestCreateStudentDto } from './dto/requestStudent.dto';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  async createStudent(body: RequestCreateStudentDto) {
    try {
      await StudentRepository.save(body);
    } catch (err) {
      throw new Error('학생을 생성하지 못했습니다.');
    }
  }

  async findStudentList() {
    return await StudentRepository.find();
  }
}
