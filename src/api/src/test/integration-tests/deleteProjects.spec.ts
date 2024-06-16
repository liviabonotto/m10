import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from '../../projects/shared/project.service/project.service';
import { AppModule } from '../../app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('ProjectsController', () => {
  let app: INestApplication;
  let projectService: ProjectService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    projectService = moduleFixture.get<ProjectService>(ProjectService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/DELETE projects/:id', async () => {
    const mockProjectId = '1';

    jest.spyOn(projectService, 'delete').mockResolvedValue(null);

    const response = await request(app.getHttpServer())
      .delete(`/projects/${mockProjectId}`)
      .expect(200);

    expect(response.body).toEqual({}); 

    expect(projectService.delete).toHaveBeenCalledWith(mockProjectId);
  });
});
