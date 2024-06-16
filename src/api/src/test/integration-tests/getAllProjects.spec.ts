import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProjectsModule } from '../../projects/projects.module';
import { PrismaService } from '../../../prisma/prisma.service';
import { Project } from '@prisma/client';
import { PrismaModule } from '../../../prisma/prisma.module';


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

  it('should get all projects', async () => {
    const project1: Project = await prismaService.project.create({
      data: { name: 'Project 1' },
    });

    const project2: Project = await prismaService.project.create({
      data: { name: 'Project 2' },
    });

    const response = await request(app.getHttpServer())
      .get('/projects')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(2);

    const projects = response.body;
    const projectNames = projects.map((p: Project) => p.name);
    expect(projectNames).toContain('Project 1');
    expect(projectNames).toContain('Project 2');

    await prismaService.project.delete({ where: { id: project1.id } });
    await prismaService.project.delete({ where: { id: project2.id } });
  });

  afterAll(async () => {
    await app.close();
  });
});