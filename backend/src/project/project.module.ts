// src/project/project.module.ts
import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schema';
import { DaoModule } from '../dao/dao.module'; // Import DaoModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    DaoModule // Add DaoModule to imports
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}