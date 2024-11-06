import { Injectable } from '@nestjs/common';

@Injectable()
export class LinguaApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
