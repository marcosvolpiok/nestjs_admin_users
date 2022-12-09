import { Injectable } from '@nestjs/common';

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { User } from "./interfaces/user.interface";
import { CreateUserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    // Get all products
    async getUser(): Promise<User[]> {
        const user = await this.userModel.find();
        return user;
    }
    /*
    // Get a single Product
    async getProduct(productID: string): Promise<Product> {
        const product = await this.productModel.findById(productID); 
        return product;
    }
*/
    // Post a single product
    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = new this.userModel(createUserDTO);
        return newUser.save();
    }
/*
    // Delete Product
    async deleteProduct(productID: string): Promise<any> {
        const deletedProduct = await this.productModel.findOneAndDelete(productID);
        return deletedProduct;
    }

    // Put a single product
    async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product> {
        const updatedProduct = await this.productModel
                            .findByIdAndUpdate(productID, createProductDTO, {new: true});
        return updatedProduct;
    }
*/
}