import { NestFactory } from '@nestjs/core';
import { UsersAppModule } from './users-app.module';
import { MicroserviceOptions,Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersAppModule,{
    transport: Transport.TCP,
    options:{
      port:3001
    }
  });
  app.useLogger(app.get(Logger));
  await app.listen();
}
bootstrap();
