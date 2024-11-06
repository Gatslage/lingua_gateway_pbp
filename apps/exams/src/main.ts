import { NestFactory } from '@nestjs/core';
import { ExamsModule } from './exams.module';

async function bootstrap() {
  const app = await NestFactory.create(ExamsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
