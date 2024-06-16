import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProjectsModule } from '../../projects/projects.module'; 
import { PrismaService } from '../../../prisma/prisma.service'; 
import { Project } from '@prisma/client';

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

  it('should get a project by ID', async () => {
    const testProject: Project = await prismaService.project.create({
      data: { name: 'Test Project' },
    });

    const response = await request(app.getHttpServer())
      .get(`/projects/${testProject.id}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.id).toEqual(testProject.id);
    expect(response.body.name).toEqual('Test Project');

    await prismaService.project.delete({ where: { id: testProject.id } });
  });

  afterAll(async () => {
    await app.close();
  });
});
