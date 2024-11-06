import { Test, TestingModule } from '@nestjs/testing';
import { LinguaApiGatewayController } from './lingua-api-gateway.controller';
import { LinguaApiGatewayService } from './lingua-api-gateway.service';

describe('LinguaApiGatewayController', () => {
  let linguaApiGatewayController: LinguaApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LinguaApiGatewayController],
      providers: [LinguaApiGatewayService],
    }).compile();

    linguaApiGatewayController = app.get<LinguaApiGatewayController>(LinguaApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(linguaApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
