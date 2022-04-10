import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', '/public'), {
    prefix: '/public',
  });
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
