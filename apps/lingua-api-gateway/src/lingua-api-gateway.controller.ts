import { Controller, Get } from '@nestjs/common';
import { LinguaApiGatewayService } from './lingua-api-gateway.service';

@Controller()
export class LinguaApiGatewayController {
  constructor(private readonly linguaApiGatewayService: LinguaApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.linguaApiGatewayService.getHello();
  }
}
