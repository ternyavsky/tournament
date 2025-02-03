import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationParams {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value, 10))
  skip?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value, 10))
  take?: number;
}
