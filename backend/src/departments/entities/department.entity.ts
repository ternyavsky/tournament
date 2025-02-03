import { IsPhoneNumber, Validate } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { IsUnique } from 'src/common/shared/unique.validator';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';
import { DepartmentWorker } from './departmentWorker.entity';
import { Request } from 'src/requests/entities/request.entity';

@Entity({ name: 'departments' })
export class Department extends CommonEntity {
  @Column({ unique: true })
  public title: string;

  @OneToMany(() => DepartmentWorker, (worker) => worker.department)
  public workers: DepartmentWorker[];

  @OneToMany(() => Request, (request) => request.department)
  public requests: Request[];
}
