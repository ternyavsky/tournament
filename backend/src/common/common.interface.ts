export interface ICommonControllerFactoryOpts<CommonEntity> {
  entity: { new (): CommonEntity };
}

export interface ICommonEntityParams {
  id: string;
}

import {
  FindOptions,
  FindManyOptions,
  UpdateResult,
  DeleteResult,
  DeepPartial,
  FindOneOptions,
} from 'typeorm';
import { CommonEntity } from './common.entity';

export interface ICommonService<T> {
  findAll?: (f: FindManyOptions<T>) => Promise<T[]>;
  findOne?: (param: any) => Promise<T>;
  create?: (entity: T) => Promise<T>;
  update?: (id: string | number, data: Partial<T>) => Promise<UpdateResult>;
  delete?: (id: string | number) => Promise<DeleteResult>;
}

export interface IDefaultAuthObj {
  root?: boolean;
  getById?: boolean;
  create?: boolean;
  updateOrCreate?: boolean;
  update?: boolean;
  delete?: boolean;
  count?: boolean;
  pagination?: boolean;
}

export interface IFindAndCountResult<T> {
  data: Partial<T>[];
  count: number;
  total: number;
}
export interface IPaginationQuery {
  pageSize: number;
  pageNumber: number;
  filter: string;
}

export interface IBaseServiceCache {
  find: boolean;
  findById: boolean;
  findOne: boolean;
  findAndCount: boolean;
}

export interface IBeforeRoot<T = any> {
  beforeRoot: (f: FindManyOptions<T>) => void;
}

export interface IAfterRoot<T = any, F = Partial<T>> {
  afterRoot(f: FindManyOptions<T>, d: T, md?: F): void;
}

export interface IBeforeCount {
  beforeCount(): void;
}

export interface IAfterCount {
  afterCount(c: number): void;
}

export interface IBeforePagination {
  beforePagination(q: IPaginationQuery): void;
}

export interface IAfterPagination<T = any> {
  afterPagination(
    q: IPaginationQuery,
    d: IFindAndCountResult<T>,
    md?: IFindAndCountResult<Partial<T>>,
  ): void;
}

export interface IBeforeGetById {
  beforeGetById(i: number | string): void;
}

export interface IAftergetById<T = any> {
  aftergetById(i: string | number, d: T, md?: Partial<T>): void;
}

export interface IBeforeCreate<VM = any> {
  beforeCreate(v: VM): void;
}

export interface IAfterCreate<T = any, VM = any> {
  afterCreate(v: VM, d: T, md?: Partial<T>): void;
}

export interface IBeforeUpdateOrCreate<VM = any> {
  beforeUpdateOrCreate(v: VM): void;
}

export interface IAfterUpdateOrCreate<T = any, VM = any> {
  afterUpdateOrCreate(
    v: VM,
    d: T | UpdateResult,
    md?: Partial<T> | UpdateResult,
  ): void;
}

export interface IBeforeUpdate<VM = any> {
  beforeUpdate(v: VM): void;
}

export interface IAfterUpdate<VM = any> {
  afterUpdate(v: VM, d: UpdateResult): void;
}

export interface IBeforeDelete {
  beforeDelete(i: number | string): void;
}

export interface IAfterDelete {
  afterDelete(i: string | number, d: DeleteResult): void;
}
