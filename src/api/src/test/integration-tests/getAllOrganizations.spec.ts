import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OrganizationsModule } from '../../organizations/organizations.module';
import { PrismaService } from '../../../prisma/prisma.service';
import { Organization, Project } from '@prisma/client';

describe('OrganizationsController (integration)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [OrganizationsModule],
      providers: [PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    await app.init();
  });

  it('should get all organizations', async () => {
    const organization1: Organization = await prismaService.organization.create({
      data: { name: 'Organization 1', logo: 'exemplo2' },
    });

    const organization2: Organization = await prismaService.organization.create({
      data: { name: 'Organization 2', logo: 'exemplo2' },
    });

    const response = await request(app.getHttpServer())
      .get('/organizations')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(2);

    const organizations = response.body;
    const organizationNames = organizations.map((p: Organization) => p.name);
    expect(organizationNames).toContain('Organization 1');
    expect(organizationNames).toContain('Organization 2');

    await prismaService.organization.delete({ where: { id: organization1.id } });
    await prismaService.organization.delete({ where: { id: organization2.id } });
  });

  afterAll(async () => {
    await app.close();
  });
});