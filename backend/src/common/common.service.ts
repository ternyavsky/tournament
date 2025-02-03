import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationParams } from './params/pagingation.params';

@Injectable()
export abstract class CommonService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  public async create(
    data: DeepPartial<T>,
    file: any,
    avatar: any,
  ): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  public async findAll(params: PaginationParams): Promise<T[]> {
    return this.repository.find();
  }

  public async findOne(conditions: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.repository.findOneBy(conditions);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  public async update(id: any, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne({ id } as FindOptionsWhere<T>);
    Object.assign(entity, data);
    return this.repository.save(entity);
  }

  public async remove(id: any): Promise<void> {
    const entity = await this.findOne({ id } as FindOptionsWhere<T>);
    await this.repository.remove(entity);
  }
}
