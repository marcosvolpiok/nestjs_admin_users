import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { UserSeed } from '../../user/seeds/user.seed';
import { UserService } from '../../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../user/schemas/user.schema';

@Module({
    imports: [CommandModule, MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    providers: [UserSeed, UserService],
    exports: [UserSeed, UserService],
})
export class SeedsModule {}