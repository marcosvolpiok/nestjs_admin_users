import { Injectable } from "@nestjs/common";
const bcrypt = require('bcrypt');

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { User } from "./interfaces/user.interface";
import { CreateUserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getUser(): Promise<User[]> {
        const userFields = {
            firstName: 1,
            lastName: 1,
            address: 1,
            image: 1,
            user: 1
        }
        const user = await this.userModel.find({}, userFields);
        return user;
    }

    async getUserByUsername(userLogin: String): Promise<User> {
        // const userFields = {
        //     firstName: 1,
        //     lastName: 1,
        //     address: 1,
        //     image: 1,
        //     user: 1
        // }
        const user = await this.userModel.findOne({user: userLogin});
        return user;
    }    
    
    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = new this.userModel(createUserDTO);
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser.save();
    }
}