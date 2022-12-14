import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { S3Service } from '../s3-service/s3-service.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  providers: [UserService, S3Service],
  controllers: [UserController]
})
export class UserModule {}
