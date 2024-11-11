import { Module } from '@nestjs/common';
import { AuthLibraryService } from './auth-library.service';
import { ClientsModule,Transport } from '@nestjs/microservices';
import { ValidateTokenGlobal } from './auth-library.interceptor';

const client_module = ClientsModule.register(
    [{name:'USERS_CLIENT',transport:Transport.TCP, options:{port:3001}}]
  );

@Module({
  imports:[client_module],
  providers: [AuthLibraryService,ValidateTokenGlobal],
  exports: [AuthLibraryService,ValidateTokenGlobal,client_module],
})
export class AuthLibraryModule {}
