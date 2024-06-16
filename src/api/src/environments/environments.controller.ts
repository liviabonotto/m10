import { Get, Post, Controller, Param, Body, Put, Delete, Query } from '@nestjs/common';
import { EnvironmentService } from './shared/environment.service/environment.service';
import { Prisma, Environment } from '@prisma/client';


@Controller('environments')
export class EnvironmentsController {

  constructor(private readonly environmentService: EnvironmentService) {}


    @Get(':projectId')
    async getAll(@Param('projectId') projectId: string) {
        console.log('GET /environments/:projectId called with projectId:', projectId);
        return this.environmentService.getAll(projectId);
    }

    @Get(':projectId/:environmentId')
    async getEnvironmentByProjectId(
      @Param('projectId') projectId: string,
      @Param('environmentId') environmentId: string,
    ): Promise<Environment | null> {
      console.log(`GET /environments/${projectId}/${environmentId} called`);
      return this.environmentService.getEnvironmentByProjectId(projectId, environmentId);
    }

    @Post(':projectId')
    async create(@Param('projectId') projectId: string, @Body() data: Prisma.EnvironmentCreateInput) {
        console.log('POST /environments called with data:', data);
        return this.environmentService.create(projectId, data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Prisma.EnvironmentUpdateInput) {
        console.log('PUT /environments/:id called with id:', id, 'and data:', data);
        return this.environmentService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        console.log('DELETE /environments/:id called with id:', id);
        return this.environmentService.delete(id);
    }

}
