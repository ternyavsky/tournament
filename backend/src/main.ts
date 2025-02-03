import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { json, urlencoded } from 'express';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();

  SwaggerConfig(app);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(8000);
}
bootstrap();
