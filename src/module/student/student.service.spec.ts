import { TestingModule } from '@nestjs/testing';
import { getTestingModule, truncateAllTables } from '@src/common/test';
import { ConfigProvider } from '@src/config';
import { DataSources } from '@src/database/data-source';
import { StudentEntity } from '@src/database/entity/student.entity';
import { plainToInstance } from 'class-transformer';
import { RequestCreateStudentDto } from './dto/requestStudent.dto';
import * as StudentRepo from './student.repository';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let studentService: StudentService;

  beforeAll(async () => {
    await ConfigProvider.initialize();
    await DataSources.instance.initialize();
  });

  beforeEach(async () => {
    await truncateAllTables(DataSources.instance);
    const app: TestingModule = await getTestingModule();

    studentService = app.get<StudentService>(StudentService);
  });

  describe('Test: createStudent', () => {
    const body = plainToInstance(RequestCreateStudentDto, {
      name: '테스트 학생',
    });

    describe('When: 정상적인 body param이 입력되었을때', () => {
      it('Then: 학생 생성 성공', async () => {
        await studentService.createStudent(body);
        const actual = await StudentRepository.findOneBy({
          name: body.name,
        });

        expect(actual).toEqual(
          plainToInstance(StudentEntity, {
            id: expect.anything(),
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
            deletedAt: null,
            ...body,
          }),
        );
      });
    });

    describe('When: 데이터베이스 저장 실패일때', () => {
      beforeEach(async () => {
        jest
          .spyOn(StudentRepo, 'getStudentRepository')
          .mockImplementation(() => StudentRepository);
        jest.spyOn(StudentRepository, 'save').mockImplementation(async () => {
          throw new Error();
        });
      });

      it('Then: throw new Error', async () => {
        await studentService
          .createStudent(body)
          .then(() => expect(1).toBe(0))
          .catch((err) => {
            expect(err.message).toEqual('학생을 생성하지 못했습니다.');
          });
      });
    });
  });
});
