import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { DepartmentWorker } from './entities/departmentWorker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, DepartmentWorker])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
