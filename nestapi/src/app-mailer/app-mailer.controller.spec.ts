import { Test, TestingModule } from '@nestjs/testing';
import { AppMailerController } from './app-mailer.controller';

describe('AppMailer Controller', () => {
  let controller: AppMailerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppMailerController],
    }).compile();

    controller = module.get<AppMailerController>(AppMailerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
