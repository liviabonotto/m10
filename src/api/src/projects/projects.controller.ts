import { Get, Post, Controller, Param, Body, Put, Delete } from '@nestjs/common';
import { ProjectService } from './shared/project.service/project.service';
import { promises } from 'dns';
import { Project } from '@prisma/client';
import { CreateProjectDto } from './create-project.dto';


@Controller('projects')
export class ProjectsController {

  constructor(private readonly projectService: ProjectService) {}


    @Get()
    async getAll() : Promise<Project[]> {
        console.log('GET /projects called');
        return this.projectService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) : Promise<Project | null> {
        console.log('GET /projects/:id called with id:', id);
        return this.projectService.getById(id);
    }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }

    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() projectData: { name: string },
    ): Promise<Project | null> {
      console.log('PUT /projects/:id called with id:', id, 'and data:', projectData);
      return this.projectService.update(id, { name: projectData.name });
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Project> {
      console.log('DELETE /projects/:id called with id:', id);
      return this.projectService.delete(id);
    }

}