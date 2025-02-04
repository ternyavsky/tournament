import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './common/itc/timeout.itc';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { S3Module } from 'nestjs-s3';
import {
  S3Config,
  TypeOrmCfgService,
  PrometheusConfig,
  chunkingOption,
} from './config';
import { MinioService } from './config/s3/minio.service';
import { IsUnique } from './common/shared/unique.validator';
import { IsExist } from './common/shared/exist.validator';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { BullConfig } from './config/bull';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RequestsModule } from './requests/requests.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PrometheusModule.registerAsync({
      useClass: PrometheusConfig,
    }),

    BullModule.forRootAsync({
      useClass: BullConfig,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmCfgService,
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    S3Module.forRootAsync({
      useClass: S3Config,
    }),
    UsersModule,
    AuthModule,
    RequestsModule,
    DepartmentsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },

    IsUnique,
    IsExist,
    AppService,
    MinioService,
  ],
})
export class AppModule {}
