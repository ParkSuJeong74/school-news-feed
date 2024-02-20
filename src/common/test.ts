import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { DataSource } from 'typeorm';

export async function getTestingModule() {
  const app: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    // .overrideProvider(TransactionService)
    // .useValue(testingTransactionService)
    // .overrideProvider(RepositoryProvider)
    // .useValue(testingRepositoryProvider)
    .compile();

  return app;
}

export const truncateAllTables = async (dataSource: DataSource) => {
  if (process.env.NODE_ENV !== 'test') {
    return;
  }

  const tables = [
    'news',
    'school',
    'school_admin',
    'student',
    'subscribe_school_student',
  ];

  try {
    await dataSource.query(
      `TRUNCATE TABLE ${tables.join(',')} restart identity;`,
    );
  } catch (e) {
    console.error(e);
    console.info('common/test.ts 의 tables 누락된 테이블 확인 필요');
  }
};
