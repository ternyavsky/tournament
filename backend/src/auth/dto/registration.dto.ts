import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, Validate } from 'class-validator';
import { IsUnique } from 'src/common/shared/unique.validator';

export class RegistrationDto {
  @Validate(IsUnique, ['users', 'login'])
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
