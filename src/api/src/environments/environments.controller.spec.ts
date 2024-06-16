import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentsController } from './environments.controller';
import { EnvironmentService } from './shared/environment.service/environment.service';
import { PrismaService } from '../../prisma/prisma.service';  // Certifique-se de que o caminho está correto

describe('EnvironmentsController', () => {
  let controller: EnvironmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvironmentsController],
      providers: [
        EnvironmentService,
        PrismaService,  
        {
          provide: PrismaService,
          useValue: {
          },
        },
      ],
    }).compile();

    controller = module.get<EnvironmentsController>(EnvironmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

