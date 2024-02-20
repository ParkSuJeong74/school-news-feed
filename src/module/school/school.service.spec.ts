import { TestingModule } from '@nestjs/testing';
import { getTestingModule, truncateAllTables } from '@src/common/test';
import { ConfigProvider } from '@src/config';
import { DataSources } from '@src/database/data-source';
import { SchoolAdminEntity } from '@src/database/entity/schoolAdmin.entity';
import { schoolFixture } from '@test/fixture/school.fixture';
import { schoolAdminFixture } from '@test/fixture/schoolAdmin.fixture';
import { plainToInstance } from 'class-transformer';
import { SchoolAdminRepository } from '../schoolAdmin/schoolAdmin.repository';
import { RequestCreateSchoolDto } from './dto/requestSchool.dto';
import * as SchoolRepo from './school.repository';
import { SchoolRepository } from './school.repository';
import { SchoolService } from './school.service';

describe('SchoolService', () => {
  let schoolService: SchoolService;

  beforeAll(async () => {
    await ConfigProvider.initialize();
    await DataSources.instance.initialize();
  });

  beforeEach(async () => {
    await truncateAllTables(DataSources.instance);
    const app: TestingModule = await getTestingModule();

    schoolService = app.get<SchoolService>(SchoolService);

    await SchoolAdminRepository.save(schoolAdminFixture);
    await SchoolRepository.save(schoolFixture);
  });

  describe('Test: createSchool', () => {
    const schoolAdminId = 1;
    const body = plainToInstance(RequestCreateSchoolDto, {
      name: '학교 이름',
      region: '선릉',
    });

    describe('When: 이미 학교 페이지를 만든 학교 관리자가 학교 페이지를 생성하고자 할때', () => {
      it('Then: throw new Error', async () => {
        await schoolService
          .createSchool(schoolAdminId, body)
          .then(() => expect(1).toBe(0))
          .catch((err) => {
            expect(err.message).toEqual('이미 관리 학교가 존재합니다.');
          });
      });
    });

    describe('When: 아직 학교 페이지를 만들지 않은 학교 관리자가 학교 페이지를 생성하고자 할때', () => {
      const schoolAdminId = 5;
      it('Then: 학교 생성 성공', async () => {
        await await schoolService.createSchool(schoolAdminId, body);
        const actual = await SchoolRepository.findOneBy({
          name: body.name,
          region: body.region,
        });

        expect(actual).toEqual(
          plainToInstance(SchoolAdminEntity, {
            id: expect.anything(),
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
            deletedAt: null,
            ...body,
            schoolAdminId,
          }),
        );
      });
    });

    describe('When: 데이터베이스 저장 실패일때', () => {
      const schoolAdminId = 999;

      beforeEach(async () => {
        jest
          .spyOn(SchoolRepo, 'getSchoolRepository')
          .mockImplementation(() => SchoolRepository);
        jest.spyOn(SchoolRepository, 'save').mockImplementation(async () => {
          throw new Error();
        });
      });

      it('Then: throw new Error', async () => {
        await schoolService
          .createSchool(schoolAdminId, body)
          .then(() => expect(1).toBe(0))
          .catch((err) => {
            expect(err.message).toEqual('학교를 생성하지 못했습니다.');
          });
      });
    });
  });
});
