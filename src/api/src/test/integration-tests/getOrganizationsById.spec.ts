import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OrganizationsModule } from '../../organizations/organizations.module'; 
import { PrismaService } from '../../../prisma/prisma.service'; 
import { Organization } from '@prisma/client';
import { CreateOrganizationDto } from '../../organizations/create-organization.dto'; 

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

  it('should create an organization', async () => {
    const createOrganizationDto: CreateOrganizationDto = {
      name: 'Test Organization',
      logo: 'https://example.com/logo.png',
      projects: [
        {
          name: 'Test Project',
          environments: [
            { name: 'Test Environment 1' },
            { name: 'Test Environment 2' },
          ],
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/organizations')
      .send(createOrganizationDto)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toEqual('Test Organization');

    const organizationId = response.body.id;
    await prismaService.organization.delete({ where: { id: organizationId } });
  });

  afterAll(async () => {
    await app.close();
  });
});
