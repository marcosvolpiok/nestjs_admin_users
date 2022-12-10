import { Injectable } from '@nestjs/common';

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { User } from "./interfaces/user.interface";
import { CreateUserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getUser(): Promise<User[]> {
        const user = await this.userModel.find();
        return user;
    }
    
    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = new this.userModel(createUserDTO);
        return newUser.save();
    }
}