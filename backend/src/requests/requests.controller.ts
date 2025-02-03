import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CommonController } from 'src/common/common.controller';
import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('requests')
export class RequestsController extends CommonController<Request> {
  constructor(private readonly requestsService: RequestsService) {
    super(requestsService);
  }
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('users.*.file'))
  @UseInterceptors(FileInterceptor('users.*.avatar'))
  async create(
    @Body() createRequestDto: CreateRequestDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 4096 }),
          new FileTypeValidator({ fileType: 'image/jpg' }),
        ],
      }),
    )
    avatar: Express.Multer.File, // Извлекаем первый файл
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'pdf' })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Request> {
    return this.requestsService.create(createRequestDto);
  }
}
