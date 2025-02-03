import { ApiHideProperty } from '@nestjs/swagger';
import { IsPhoneNumber, Validate } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { IsUnique } from 'src/common/shared/unique.validator';
import { Request } from 'src/requests/entities/request.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends CommonEntity {
  @Validate(IsUnique, ['users', 'login'])
  @Column({ unique: true, length: 30, nullable: true })
  public login: string;

  @Column({ name: 'first_name', nullable: true })
  public firstName: string;

  @Column({ name: 'last_name', nullable: true })
  public lastName: string;

  @Column({ nullable: true })
  public organization: string;

  @Column({ nullable: true })
  public note: string;

  @Column({ type: 'date', nullable: true })
  public birthday: Date;

  @IsPhoneNumber('RU')
  @Column({ name: 'phone_number', nullable: true })
  public phoneNumber: string;

  @Column({ name: 'passport_serias', nullable: true })
  public passportSerias: number;

  @Column({ name: 'passport_number', nullable: true })
  public passportNumber: number;

  @Column({
    name: 'date_assign',
    type: 'timestamp with time zone',
    nullable: true,
  })
  public dateAssign: Date;

  @Column({ nullable: true })
  public file: string;

  @Column({ nullable: true })
  public surname: string;

  @Column({ nullable: true })
  public avatar: string;

  @ApiHideProperty()
  @Column()
  public password: string;

  @Validate(IsUnique, ['users', 'email'])
  @Column({ length: 225, unique: true, nullable: true })
  public email: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
  public deletedAt: Date;

  @ManyToOne(() => Request, (request) => request.users, {
    onDelete: 'SET NULL',
  })
  public request: Request;
}
