import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys : ['usama']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true //dont allow additional  parameters in request body
      })
  )
  await app.listen(3000);
}
bootstrap();
