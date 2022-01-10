import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import authJwtConfig from './auth.config';
import { JwtStrategy } from './auth.strategy';
import { LocalGaurd } from './localgaurd.gaurd';
import { JWT_STRATEGY } from './auth.constants';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: JWT_STRATEGY }),
    JwtModule.register({
      secret: 'kist123',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    // ConfigModule.forFeature(authJwtConfig)
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule { }
