import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { Department } from 'src/departments/entities/department.entity';
import { DepartmentWorker } from 'src/departments/entities/departmentWorker.entity';
import { User } from 'src/users/entites/user.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request, Department, DepartmentWorker, User]),

    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '../upload',
      }),
    }),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
