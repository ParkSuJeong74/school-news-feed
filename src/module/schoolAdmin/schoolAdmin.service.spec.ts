import { TestingModule } from '@nestjs/testing';
import { getTestingModule, truncateAllTables } from '@src/common/test';
import { ConfigProvider } from '@src/config';
import { DataSources } from '@src/database/data-source';
import { SchoolAdminEntity } from '@src/database/entity/schoolAdmin.entity';
import { plainToInstance } from 'class-transformer';
import { RequestCreateSchoolAdminDto } from './dto/requestSchoolAdmin.dto';
import * as SchoolAdminRepo from './schoolAdmin.repository';
import { SchoolAdminRepository } from './schoolAdmin.repository';
import { SchoolAdminService } from './schoolAdmin.service';

describe('StudentService', () => {
  let schoolAdminService: SchoolAdminService;

  beforeAll(async () => {
    await ConfigProvider.initialize();
    await DataSources.instance.initialize();
  });

  beforeEach(async () => {
    await truncateAllTables(DataSources.instance);
    const app: TestingModule = await getTestingModule();

    schoolAdminService = app.get<SchoolAdminService>(SchoolAdminService);
  });

  describe('Test: createSchoolAdmin', () => {
    describe('When: 정상적인 body param이 입력되었을때', () => {
      const body = plainToInstance(RequestCreateSchoolAdminDto, {
        name: '테스트 학교 관리자',
      });

      it('Then: 학교 관리자 생성 성공', async () => {
        await schoolAdminService.createSchoolAdmin(body);
        const actual = await SchoolAdminRepository.findOneBy({
          name: body.name,
        });

        expect(actual).toEqual(
          plainToInstance(SchoolAdminEntity, {
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
          .spyOn(SchoolAdminRepo, 'getSchoolAdminRepository')
          .mockImplementation(() => SchoolAdminRepository);
        jest
          .spyOn(SchoolAdminRepository, 'save')
          .mockImplementation(async () => {
            throw new Error();
          });
      });

      const body = plainToInstance(RequestCreateSchoolAdminDto, {
        name: '테스트 학교 관리자',
      });

      it('Then: throw new Error', async () => {
        await schoolAdminService
          .createSchoolAdmin(body)
          .then(() => expect(1).toBe(0))
          .catch((err) => {
            expect(err.message).toEqual('관리자를 생성하지 못했습니다.');
          });
      });
    });
  });
});
