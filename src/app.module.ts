import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/challenge_kenility', {
      useNewUrlParser: true
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
