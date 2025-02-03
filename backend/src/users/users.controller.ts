import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CommonController } from 'src/common/common.controller';
import { User } from './entites/user.entity';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginationParams } from 'src/common/params/pagingation.params';

@Controller('users')
export class UsersController extends CommonController<User> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @ApiResponse({ type: User })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @Get()
  async findAll(@Query() params: PaginationParams): Promise<User[]> {
    return this.service.findAll(params);
  }
}
