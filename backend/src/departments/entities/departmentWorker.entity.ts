import { IsPhoneNumber, Validate } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { IsUnique } from 'src/common/shared/unique.validator';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Department } from './department.entity';

@Entity({ name: 'department_workers' })
export class DepartmentWorker extends CommonEntity {
  @Column({ name: 'first_name', nullable: true })
  public firstName: string;

  @Column({ name: 'last_name', nullable: true })
  public lastName: string;

  @ManyToOne(() => Department, (department) => department, {
    onDelete: 'CASCADE',
  })
  public department: Department;
}
