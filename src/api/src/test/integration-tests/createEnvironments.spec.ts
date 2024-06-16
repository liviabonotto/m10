import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EnvironmentsModule } from '../../environments/environments.module';
import { PrismaService } from '../../../prisma/prisma.service';

describe('EnvironmentsController (integration)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentsModule],
      providers: [PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    await app.init();
  });

  it('should create an environment', async () => {
    const projectId = 'test-project-id';
    const environmentData = { name: 'Test Environment' };
    const response = await request(app.getHttpServer())
      .post(`/environments/${projectId}`)
      .send(environmentData)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toEqual('Test Environment');

    const environmentId = response.body.id;
    await prismaService.environment.delete({ where: { id: environmentId } });
  });

  afterAll(async () => {
    await app.close();
  });
});
