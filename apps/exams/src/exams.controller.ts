import { Controller, Get } from '@nestjs/common';
import { ExamsService } from './exams.service';

@Controller()
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  getHello(): string {
    return this.examsService.getHello();
  }
}
