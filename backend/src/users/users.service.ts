import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { User } from './entites/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends CommonService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }
}
