import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentService } from './environment.service';
import { PrismaService } from '../../../../prisma/prisma.service';  

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvironmentService,
        {
          provide: PrismaService,
          useValue: {
            findMany: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<EnvironmentService>(EnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

