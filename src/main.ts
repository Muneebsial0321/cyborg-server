import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" })
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  // Serve static files from upload directory
  app.use('/uploads', express.static(path.join(process.cwd(), 'upload')));
  
  await app.listen(5000);
  console.log("Server on port :5000");

}
bootstrap();
