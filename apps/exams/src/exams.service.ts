import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamsService {
  getHello(): string {
    return 'Hello World!';
  }
}
