import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EnvironmentsModule } from '../../environments/environments.module';
import { PrismaService } from '../../../prisma/prisma.service';
import { Environment, Project } from '@prisma/client';

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

  it('should get all environments', async () => {
    const projectId = 'test-project-id';

    const project: Project = await prismaService.project.create({
      data: { id: projectId, name: 'Test Project' },
    });

    const environment1: Environment = await prismaService.environment.create({
      data: { name: 'Environment 1', Project_environment: { create: { project_id: projectId } } },
    });

    const environment2: Environment = await prismaService.environment.create({
      data: { name: 'Environment 2', Project_environment: { create: { project_id: projectId } } },
    });

    const response = await request(app.getHttpServer())
      .get(`/environments/${projectId}`) 
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(2);

    const environments = response.body;
    const environmentNames = environments.map((p: Environment) => p.name);

    expect(environmentNames).toContain('Environment 1');
    expect(environmentNames).toContain('Environment 2');

    await prismaService.environment.delete({ where: { id: environment1.id } });
    await prismaService.environment.delete({ where: { id: environment2.id } });

    await prismaService.project.delete({ where: { id: project.id } });
  });

  afterAll(async () => {
    await app.close();
  });
});
