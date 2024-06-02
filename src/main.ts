import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'dotenv/config';
import * as express from 'express';
import * as morgan from 'morgan';
import helmet from 'helmet';
import { HttpExceptionFilter } from 'src/exceptions/http.exception';
import { AppModule } from './app.module';
import { CORS } from './core/config/cors';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  app.enableCors(CORS);
  app.use(express.json({ limit: '7mb' }));
  app.use(helmet());
  app.use(morgan('dev'));
  setupGlobalPipes(app);
  app.useGlobalFilters(new HttpExceptionFilter());

  function setupGlobalPipes(app: INestApplication) {
    app.useGlobalPipes(
      new ValidationPipe({
        transformOptions: {
          enableImplicitConversion: true,
        },
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
  }

  setupSwagger(app);
  await app.listen(configService.get('PORT') || 3000);
}

bootstrap();
