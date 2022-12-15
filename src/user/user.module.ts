import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { S3Service } from '../s3-service/s3-service.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ResponseService } from '../response/response.service';
import { IsUserAlreadyExistConstraint } from './validations/user-is-not-repeated';
import { UserExistConstraint } from './validations/user-exists';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  providers: [UserService, S3Service, ResponseService, IsUserAlreadyExistConstraint, UserExistConstraint],
  controllers: [UserController]
})
export class UserModule {}
