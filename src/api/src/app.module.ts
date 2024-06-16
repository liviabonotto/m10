import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { EnvironmentsModule } from './environments/environments.module';
import { ProjectsModule } from './projects/projects.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [EnvironmentsModule, ProjectsModule, OrganizationsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}