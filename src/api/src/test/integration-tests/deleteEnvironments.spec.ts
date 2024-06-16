import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentService } from '../../environments/shared/environment.service/environment.service';
import { AppModule } from '../../app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('EnvironmentsController', () => {
  let app: INestApplication;
  let environmentService: EnvironmentService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    environmentService = moduleFixture.get<EnvironmentService>(EnvironmentService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/DELETE environments/:id', async () => {
    // Mock data
    const mockEnvironmentId = '1';

    // Mock the service method
    jest.spyOn(environmentService, 'delete').mockResolvedValue(null);

    // Perform the request
    const response = await request(app.getHttpServer())
      .delete(`/environments/${mockEnvironmentId}`)
      .expect(200);

    // Assert the response
    expect(response.body).toEqual({}); // Assuming the response body is empty for successful deletion

    // Verify if the service method was called with the correct ID
    expect(environmentService.delete).toHaveBeenCalledWith(mockEnvironmentId);
  });
});
