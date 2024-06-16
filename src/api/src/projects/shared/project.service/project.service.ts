import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma, Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.project.findMany({
      include: {
        Project_environment: {
          include: {
            environment: true,
          },
        },
      },
    });
  }


  getById(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        Project_environment: {
          include: {
            environment: true,
          },
        },
      },
    });
  }

  getAllByOrganizationId(organizationId: string) {
    return this.prisma.project.findMany({
      where: {
        Organization_project: {
          some: {
            organization_id: organizationId,
          },
        },
      },
      include: {
        Project_environment: {
          include: {
            environment: true,
          },
        },
      },
    });
  }

  getOneByOrganizationId(organizationId: string, projectId: string) {
    return this.prisma.project.findFirst({
      where: {
        id: projectId,
        Organization_project: {
          some: {
            organization_id: organizationId,
          },
        },
      },
      include: {
        Project_environment: {
          include: {
            environment: true,
          },
        },
      },
    });
  }

  create(data: { name: string, environments: { name: string }[] }): Promise<Project> {
    return this.prisma.project.create({
      data: {
        name: data.name,
        Project_environment: {
          create: data.environments.map(env => ({
            environment: {
              create: {
                name: env.name,
              },
            },
          })),
        },
      },
      include: {
        Project_environment: {
          include: {
            environment: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project | null> {
    return this.prisma.project.update({
      where: { id },
      data,
      include: {
        Project_environment: {
          include: {
            environment: true,
          },
        },
      },
    });
  }
  
  async delete(id: string): Promise<Project> {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
