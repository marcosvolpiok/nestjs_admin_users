
import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from "mongoose";
import { User } from "../user/interfaces/user.interface";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);    
    
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }  
}