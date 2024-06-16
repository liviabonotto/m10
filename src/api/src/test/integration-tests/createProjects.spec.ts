import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProjectsModule } from '../../projects/projects.module'; 
import { PrismaService } from '../../../prisma/prisma.service'; 
import { Project } from '@prisma/client';
import { CreateProjectDto } from '../../projects/create-project.dto'; 

describe('ProjectsController (integration)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ProjectsModule],
      providers: [PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    await app.init();
  });

  it('should create a project', async () => {
    const createProjectDto: CreateProjectDto = {
      name: 'Test Project',
      environments: [
        { name: 'Test Environment 1' },
        { name: 'Test Environment 2' },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/projects')
      .send(createProjectDto)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toEqual('Test Project');

    const projectId = response.body.id;
    await prismaService.project.delete({ where: { id: projectId } });
  });

  afterAll(async () => {
    await app.close();
  });
});
