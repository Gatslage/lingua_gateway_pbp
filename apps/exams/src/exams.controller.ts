import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ValidateTokenGlobal } from '@app/auth-library';

@Controller()
@UseInterceptors(ValidateTokenGlobal)
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @MessagePattern('exams.findAll')
  findAll(): string {
    return this.examsService.findAll();
  }
}
