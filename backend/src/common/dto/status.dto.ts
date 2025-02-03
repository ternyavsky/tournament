import { ApiProperty } from '@nestjs/swagger';

export class StatusOKDto {
  @ApiProperty()
  status: string = 'OK';
}
