import { PartialType } from '@nestjs/swagger';
import { CreateCommonDto } from './create-common.dto';

export abstract class UpdateCommonDto<T> extends CreateCommonDto<T> {}
