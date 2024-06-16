import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './shared/project.service/project.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ProjectsController],
    providers: [ProjectService],
    exports: [ProjectService],
})
export class ProjectsModule {}
