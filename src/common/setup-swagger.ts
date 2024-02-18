import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigProvider } from '@src/config';

export async function setupSwagger(app: INestApplication): Promise<void> {
  const config = ConfigProvider.getConfig();
  if (config.stage === 'production') return;
  const { version } = await import('../../package.json');

  const cmsSwaggerConfig = new DocumentBuilder()
    .setTitle('Classting Backend API')
    .setVersion(version)
    .build();

  SwaggerModule.setup(
    'api/docs',
    app,
    SwaggerModule.createDocument(app, cmsSwaggerConfig),
  );

  Logger.verbose('http://localhost:3000/api/docs');
}
