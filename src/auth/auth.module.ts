import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { S3Service } from '../s3-service/s3-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
  ],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy, S3Service],
  exports: [AuthService, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
