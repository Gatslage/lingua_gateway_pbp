import { NestFactory } from '@nestjs/core';
import { ExamsModule } from './exams.module';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions,Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ExamsModule,{
    transport: Transport.TCP,
    options:{
      port:3002
    }
  });
  app.useLogger(app.get(Logger));
  await app.listen();
}
bootstrap();
