import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports:[ClientsModule.register(
    [{name:'EXAMS_CLIENT',transport:Transport.TCP, options:{port:3002}}]
  )],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
