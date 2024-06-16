import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma, Environment } from '@prisma/client';



@Injectable()
export class EnvironmentService {
    constructor(private prisma: PrismaService) {}

    getAll(projectId: string) {
        return this.prisma.environment.findMany({
            where: {
                Project_environment: {
                    some: {
                        project_id: projectId,
                    },
                },
            },
        });
    }
    

    getById(id: string) {
        return this.prisma.environment.findUnique({ where: { id },});
    }

    async getEnvironmentByProjectId(projectId: string, environmentId: string): Promise<Environment | null> {
        const projectEnvironment = await this.prisma.project_environment.findUnique({
          where: {
            environment_id_project_id: {
              environment_id: environmentId,
              project_id: projectId,
            },
          },
          include: {
            environment: true,
          },
        });
    
        return projectEnvironment ? projectEnvironment.environment : null;
    }

    create(projectId: string, data: Prisma.EnvironmentCreateInput): Promise<Environment> {
        return this.prisma.environment.create({
            data: {
                ...data,
                Project_environment: {
                    create: {
                        project_id: projectId,
                    },
                },
            },
        });
    }

    async update(id: string, data: Prisma.EnvironmentUpdateInput): Promise<Environment | null> {
        return this.prisma.environment.update({
          where: { id },
          data,
        });
    }
    
    async delete(id: string): Promise<Environment> {
        return this.prisma.environment.delete({
          where: { id },
        });
    }
}
