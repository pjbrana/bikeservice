import { AuthModule } from '@bike/auth';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeController } from './bike.controller';
import { BikeService } from './bike.service';
import { ServiceRepository } from './repository/service.repository';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forFeature([ServiceRepository]),
    AuthModule
  ],
  controllers: [BikeController],
  providers: [BikeService,]
})
export class BikeModule { }
