import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { ClientsModule,Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register(
    [{name:'USERS_CLIENT',transport:Transport.TCP, options:{port:3001}}]
  )],
  controllers: [TrackingController,],
  providers: [TrackingService],
})
export class TrackingModule {}
