import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { S3Service } from './s3-service/s3-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`, {
      useNewUrlParser: true
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [S3Service],
})
export class AppModule {}
