import { Test, TestingModule } from '@nestjs/testing';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';

describe('ExamsController', () => {
  let examsController: ExamsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExamsController],
      providers: [ExamsService],
    }).compile();

    examsController = app.get<ExamsController>(ExamsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(examsController.getHello()).toBe('Hello World!');
    });
  });
});
