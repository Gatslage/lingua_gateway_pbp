import { NestFactory } from '@nestjs/core';
import { LinguaApiGatewayModule } from './lingua-api-gateway.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(LinguaApiGatewayModule);
  app.useLogger(app.get(Logger));
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
