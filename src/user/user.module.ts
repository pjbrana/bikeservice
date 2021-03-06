import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../libs/auth/src/user.repository';
import { AuthModule } from '@bike/auth';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule,
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
