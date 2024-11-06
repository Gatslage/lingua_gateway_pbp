import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './src/auth/auth.module';


@Module({
  imports:[AuthModule, ClientsModule.register(
    [{name:'USERS_CLIENT',transport:Transport.TCP, options:{port:3001}}]
  )],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
