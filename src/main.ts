import { NestFactory } from '@nestjs/core';
import { DataSources } from '@src/database/data-source';
import { AppModule } from './app.module';
import { ConfigProvider } from './config';

async function bootstrap() {
  await ConfigProvider.initialize();
  await DataSources.instance.initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
