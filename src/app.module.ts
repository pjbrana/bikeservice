import { AuthModule } from '@bike/auth';
import { EnvConfigModule } from '@bike/env-config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikeModule } from './bike/bike.module';
import { PartsDetail } from './bike/entities/parts-detail.entity';
import { Servicing } from './bike/entities/servicing.entity';
import { UserModule } from './user/user.module';
import dbConfig from './config/db.config';
import { User } from '../libs/auth/src/user.entity';

@Module({
  imports: [
    BikeModule,
    EnvConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Servicing, PartsDetail, User],
        synchronize: true,
      } as TypeOrmModuleOptions),

    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
