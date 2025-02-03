import { Validate } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { IsUnique } from 'src/common/shared/unique.validator';
import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/users/entites/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export enum RequestStatus {
  AWAIT = 'Проверка',
  SUCCESS = 'Одобрена',
  REJECT = 'Не одобрена',
}
export enum RequestType {
  PERSONAL = 'Личная',
  GROUP = 'Групповая',
}

@Entity({ name: 'requests' })
export class Request extends CommonEntity {
  @Column({ nullable: true, enum: RequestStatus })
  public status: RequestStatus;

  @Column({
    name: 'start_live',
    nullable: true,
    type: 'time with time zone',
  })
  public startLive: Date;
  @Column({
    name: 'start_live',
    nullable: true,
    type: 'time with time zone',
  })
  public endLive: Date;

  @Column({ nullable: true, enum: RequestType })
  public type: RequestType;

  @Column({ nullable: true })
  public goal: string;

  @Column({ name: 'reason_reject', nullable: true })
  public reasonReject: string;

  @ManyToOne(() => Department, (department) => department.requests, {
    onDelete: 'CASCADE',
  })
  public department: Department;

  @OneToMany(() => User, (users) => users.request)
  public users: User[];
}
