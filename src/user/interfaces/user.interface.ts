import { Document } from "mongoose";

export interface User extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly address: string;
    readonly image: string;
    readonly user: string;
    password: string;
    readonly createdAt: Date;
}