import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly _id: string;

  @ApiProperty()
  @IsDate()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  public readonly createdAt: Date;

  @ApiProperty()
  @IsDate()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  public updatedAt: Date;
}
