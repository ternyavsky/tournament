import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeepPartial, ObjectLiteral } from 'typeorm';
import { CommonService } from './common.service';
import { CreateCommonDto } from './dto/create-common.dto';
import { UpdateCommonDto } from './dto/update-common.dto';
import { PaginationParams } from './params/pagingation.params';

export abstract class CommonController<T extends ObjectLiteral> {
  constructor(protected readonly service: CommonService<T>) {}

  async create(
    @Body() createCommonDto: CreateCommonDto<T>,
    file: any,
    avatar: any,
  ): Promise<T> {
    return await this.service.create(
      createCommonDto as DeepPartial<T>,
      file,
      avatar,
    );
  }

  async findAll?(params: PaginationParams): Promise<T[]> {
    throw new Error('Method findAll not implemented');
  }

  async findOne?(@Param('id') id: number): Promise<T> {
    return this.service.findOne({ id } as any);
  }

  async update(
    @Param('id') id: number,
    @Body() updateCommonDto: UpdateCommonDto<T>,
  ): Promise<T> {
    return this.service.update(id, updateCommonDto as DeepPartial<T>);
  }

  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }
}
