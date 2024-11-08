import { NestFactory } from '@nestjs/core';
import { LinguaApiGatewayModule } from './lingua-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(LinguaApiGatewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
