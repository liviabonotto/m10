import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from '../../organizations/shared/organization.service/organization.service';
import { AppModule } from '../../app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('OrganizationsController', () => {
  let app: INestApplication;
  let organizationService: OrganizationService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    organizationService = moduleFixture.get<OrganizationService>(OrganizationService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/PUT organizations/:id', async () => {
    const mockOrganizationId = '1';
    const mockOrganizationData = {
      name: 'Updated Name',
      logo: 'updated-logo-url',
      projects: [
        {
          name: 'Project 1',
          environments: [{ name: 'Production' }, { name: 'Staging' }],
        },
        {
          name: 'Project 2',
          environments: [{ name: 'Testing' }],
        },
      ],
    };
    const updatedOrganization = { id: mockOrganizationId, ...mockOrganizationData };

    jest.spyOn(organizationService, 'update').mockResolvedValue(updatedOrganization);

    const response = await request(app.getHttpServer())
      .put(`/organizations/${mockOrganizationId}`)
      .send(mockOrganizationData)
      .expect(200);

    expect(response.body).toEqual(updatedOrganization);
  });
});

