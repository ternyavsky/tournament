import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}

export class LoginResponseDto {
  access_token: string;
}
