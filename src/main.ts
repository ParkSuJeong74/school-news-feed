import { NestFactory } from '@nestjs/core';
import { DataSources } from '@src/database/data-source';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptionFilter';
import { setupSwagger } from './common/setup-swagger';
import { ConfigProvider } from './config';

async function bootstrap() {
  await ConfigProvider.initialize();
  await DataSources.instance.initialize();
  const app = await NestFactory.create(AppModule);
  await setupSwagger(app);
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
