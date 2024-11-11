import { Module } from '@nestjs/common';
import { LinguaApiGatewayController } from './lingua-api-gateway.controller';
import { LinguaApiGatewayService } from './lingua-api-gateway.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { ExamsModule } from './exams/exams.module';

@Module({
  imports: [UsersModule,LoggerModule.forRoot({
    pinoHttp: {
      customProps: (req, res) => ({
        context: 'HTTP',
      }),
      transport: {
        target: 'pino-pretty',
      },
    },
}
  ), ExamsModule,],
  controllers: [LinguaApiGatewayController],
  providers: [LinguaApiGatewayService],
})
export class LinguaApiGatewayModule {}
