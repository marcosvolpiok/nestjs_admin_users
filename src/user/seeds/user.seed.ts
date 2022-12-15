import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';


@Injectable()
export class UserSeed {
  constructor(
      private readonly userService: UserService,
  ) { }

  @Command({ command: 'create:user', describe: 'create a user' })
  async create() {
      const user = await this.userService.createUser({
        firstName: "marcos",
        lastName: "volpi",
        address: "1 and 2",
        user: "admin",
        password: "1234",
        createdAt: new Date()
      });
      console.log(user);
  }
}
