import { Module } from '@nestjs/common';
import { LinguaApiGatewayController } from './lingua-api-gateway.controller';
import { LinguaApiGatewayService } from './lingua-api-gateway.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [LinguaApiGatewayController],
  providers: [LinguaApiGatewayService],
})
export class LinguaApiGatewayModule {}
