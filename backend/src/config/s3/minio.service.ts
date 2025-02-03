import { Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import { Stream } from 'stream';

@Injectable()
export class MinioService {
  bucket = process.env.MINIO_BUCKET;
  pathToFile = process.env.MINIO_DOMAIN;
}
