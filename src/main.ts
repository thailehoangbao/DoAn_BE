import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    // origin: ""
  );
  app.use(express.static("."))

  const config = new DocumentBuilder().setTitle("API Air BNB").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("/swagger",app,document)
  await app.listen(8088);
}
bootstrap();

//nest g resource user --no-spec
