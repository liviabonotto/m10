import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsController } from './organization.controller';
import { OrganizationService } from './shared/organization.service/organization.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('OrganizationsController', () => {
  let controller: OrganizationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [OrganizationService, PrismaService],
    }).compile();

    controller = module.get<OrganizationsController>(OrganizationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
