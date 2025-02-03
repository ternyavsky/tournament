import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { User } from 'src/users/entites/user.entity';
import { Department } from 'src/departments/entities/department.entity';
import { DepartmentWorker } from 'src/departments/entities/departmentWorker.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RequestsService extends CommonService<Request> {
  private readonly uploadPath = '../uploads'; // Папка для хранения файлов

  constructor(
    @InjectRepository(Request)
    private readonly requestsRepository: Repository<Request>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
    @InjectRepository(DepartmentWorker)
    private readonly departmentWorkersRepository: Repository<DepartmentWorker>,
  ) {
    super(requestsRepository);
  }
  private saveFile(file: Express.Multer.File, folder: string): string {
    const filename = `${Date.now()}_${file.originalname}`;
    const filePath = path.join(this.uploadPath, folder, filename);

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    fs.writeFileSync(filePath, file.buffer);

    return filePath;
  }
  async create(
    createRequestDto: CreateRequestDto,
  ): Promise<Request> {
    const { departmentId, departmentWorkerId, users, ...requestData } =
      createRequestDto;
    const departmentWorker = await this.departmentWorkersRepository.findOneBy({
      _id: departmentWorkerId,
    });
    const department = await this.departmentsRepository.findOneBy({
      _id: departmentId,
    });
    if (departmentWorker) {
      department?.workers.push(departmentWorker);
    }
    const userEntities: User[] = [];
    for (const user of users) {
      const foundUser = await this.usersRepository.findOneBy({
        email: user.email,
      });
      if (foundUser) {
        userEntities.push(foundUser);
      }
    }
    if (department) {
      const request = this.requestsRepository.create({
        department: department,
        users: userEntities,
        ...requestData,
      });
      return request;
    } else {
      throw new Error('Department not found');
    }
  }
}
