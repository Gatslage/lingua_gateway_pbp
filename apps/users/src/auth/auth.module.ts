import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController, OtherAuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities/auth.entity';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule, ConfigService } from '@nestjs/config';
import { ValidateToken } from './interceptors/auth.interceptor';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forFeature([UserAuth]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn:configService.get<string>('ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC',),
        },
      }),
      inject: [ConfigService],
    })
  ],
  providers: [AuthService,ValidateToken],
  controllers: [AuthController,OtherAuthController],
  exports:[]
})

export class AuthModule {}
