import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { S3Service } from './s3-service/s3-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/challenge_kenility', {
      useNewUrlParser: true
    }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    })
  ],
  controllers: [AppController],
  providers: [S3Service],
})
export class AppModule {}
