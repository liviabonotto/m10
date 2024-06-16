import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma, Organization } from '@prisma/client';



@Injectable()
export class OrganizationService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        return this.prisma.organization.findMany({
            include: {
                Organization_project: {
                    include: {
                        project: {
                            include: {
                                Project_environment: {
                                    include: {
                                        environment: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    async getById(id: string) {
        return this.prisma.organization.findUnique({ where: { id },});
    }

    async create(data: { name: string, logo: string, projects: { name: string, environments: { name: string }[] }[] }): Promise<Organization> {
      const organization = await this.prisma.organization.create({
          data: {
              name: data.name,
              logo: data.logo,
              Organization_project: {
                  create: data.projects.map(project => ({
                      project: {
                          create: {
                              name: project.name,
                              Project_environment: {
                                  create: project.environments.map(environment => ({
                                      environment: {
                                          create: {
                                              name: environment.name
                                          }
                                      }
                                  }))
                              }
                          }
                      }
                  }))
              }
          },
          include: {
              Organization_project: {
                  include: {
                      project: true
                  }
              }
          }
      });
      return organization;
    }

    async update(id: string, data: Prisma.OrganizationUpdateInput): Promise<Organization | null> {
        return this.prisma.organization.update({
          where: { id },
          data,
        });
    }
    
    async delete(id: string): Promise<Organization> {
        return this.prisma.organization.delete({
          where: { id },
        });
    }
}
