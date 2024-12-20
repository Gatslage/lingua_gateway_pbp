import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController, OtherAuthController } from './auth.controller';
import { ClientsModule,Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register(
    [{name:'USERS_CLIENT',transport:Transport.TCP, options:{port:3001}}]
  )],
  controllers: [AuthController,OtherAuthController],
  providers: [AuthService],
})
export class AuthModule {}
