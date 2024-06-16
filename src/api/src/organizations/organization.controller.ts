import { Get, Post, Controller, Param, Body, Put, Delete } from '@nestjs/common';
import { OrganizationService } from './shared/organization.service/organization.service';
import { Organization } from '@prisma/client';
import { CreateOrganizationDto } from './create-organization.dto';


@Controller('organizations')
export class OrganizationsController {

  constructor(private readonly organizationService: OrganizationService) {}


    @Get()
    async getAll() : Promise<Organization[]> {
        console.log('GET /organizations called');
        return this.organizationService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) : Promise<Organization | null> {
        console.log('GET /organizations/:id called with id:', id);
        return this.organizationService.getById(id);
    }

    @Post()
    create(@Body() createOrganizationDto: CreateOrganizationDto) {
        return this.organizationService.create(createOrganizationDto);
    }

    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() organizationData: { name: string },
    ): Promise<Organization | null> {
      console.log('PUT /organizations/:id called with id:', id, 'and data:', organizationData);
      return this.organizationService.update(id, { name: organizationData.name });
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Organization> {
      console.log('DELETE /organizations/:id called with id:', id);
      return this.organizationService.delete(id);
    }

}