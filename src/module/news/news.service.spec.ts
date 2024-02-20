import { TestingModule } from '@nestjs/testing';
import { getTestingModule, truncateAllTables } from '@src/common/test';
import { ConfigProvider } from '@src/config';
import { DataSources } from '@src/database/data-source';
import { NewsEntity } from '@src/database/entity/news.entity';
import { schoolFixture } from '@test/fixture/school.fixture';
import { schoolAdminFixture } from '@test/fixture/schoolAdmin.fixture';
import { plainToInstance } from 'class-transformer';
import { SchoolRepository } from '../school/school.repository';
import { SchoolAdminRepository } from '../schoolAdmin/schoolAdmin.repository';
import { RequestCreateNewsDto } from './dto/requestNews.dto';
import * as NewsRepo from './news.repository';
import { NewsRepository } from './news.repository';
import { NewsService } from './news.service';

describe('NewsService', () => {
  let newsService: NewsService;

  beforeAll(async () => {
    await ConfigProvider.initialize();
    await DataSources.instance.initialize();
  });

  beforeEach(async () => {
    await truncateAllTables(DataSources.instance);
    const app: TestingModule = await getTestingModule();

    newsService = app.get<NewsService>(NewsService);
    await SchoolAdminRepository.save(schoolAdminFixture);
    await SchoolRepository.save(schoolFixture);
  });

  describe('Test: checkAccessNews', () => {
    const schoolAdminId = 1;

    describe('When: 학교 관리자가 학교 페이지를 생성하지 않은 경우', () => {
      beforeEach(async () => {
        await SchoolRepository.delete({});
      });

      it('Then: throw new Error', async () => {
        await newsService
          .checkAccessNews(schoolAdminId)
          .then(() => expect(1).toBe(0))
          .catch((err) => {
            expect(err.message).toEqual('해당 학교 관리자가 아닙니다.');
          });
      });
    });

    describe('When: 학교 관리자가 이미 학교 페이지를 생성한 경우', () => {
      it('Then: 소식 생성 성공', async () => {
        await newsService.checkAccessNews(schoolAdminId);
      });
    });
  });

  describe('Test: createNews', () => {
    const body = plainToInstance(RequestCreateNewsDto, {
      content: '오늘까지 제출해주세요.',
      schoolId: 1,
    });
    const schoolAdminId = 1;
    const schoolId = 1;

    describe('When: 정상적인 schoolAdminId와 body param이 입력되었을때', () => {
      it('Then: 소식 생성 성공', async () => {
        await newsService.createNews(schoolAdminId, schoolId, body);
        const actual = await NewsRepository.findOneBy({
          content: body.content,
          schoolId,
        });

        expect(actual).toEqual(
          plainToInstance(NewsEntity, {
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
          .spyOn(NewsRepo, 'getNewsRepository')
          .mockImplementation(() => NewsRepository);
        jest.spyOn(NewsRepository, 'save').mockImplementation(async () => {
          throw new Error();
        });
      });

      it('Then: throw new Error', async () => {
        await newsService
          .createNews(schoolAdminId, schoolId, body)
          .then(() => expect(1).toBe(0))
          .catch((err) => {
            expect(err.message).toEqual('학교 소식을 생성하지 못했습니다.');
          });
      });
    });
  });
});
