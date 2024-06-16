import { Module } from '@nestjs/common';
import { OrganizationsController } from './organization.controller';
import { OrganizationService } from './shared/organization.service/organization.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [OrganizationsController],
    providers: [OrganizationService],
    exports: [OrganizationService],
})
export class OrganizationsModule {}
