import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamsService {
  findAll(): string {
    return 'Hello World!';
  }
}
