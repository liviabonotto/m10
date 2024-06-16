import { Module } from '@nestjs/common';
import { EnvironmentsController } from './environments.controller';
import { EnvironmentService } from './shared/environment.service/environment.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [EnvironmentsController],
    providers: [EnvironmentService],
    exports: [EnvironmentService],
})
export class EnvironmentsModule {}
