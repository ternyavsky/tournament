import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { RequestType } from '../entities/request.entity';

export class CreateRequestUserDto {
  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty({ required: true })
  surname: string;

  @ApiProperty()
  @IsPhoneNumber('RU')
  phoneNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  organization: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  birthday: Date;

  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty()
  passportSerias: number;

  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty()
  passportNumber: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class CreateRequestDto {
  @ApiProperty({ type: [CreateRequestUserDto] })
  users: CreateRequestUserDto[];

  @ApiProperty({ enum: RequestType })
  type: RequestType;

  @ApiProperty()
  startLive: Date;

  @ApiProperty()
  endLive: Date;

  @ApiProperty()
  goal: string;

  @ApiProperty()
  departmentId: string;

  @ApiProperty()
  departmentWorkerId: string;
}
