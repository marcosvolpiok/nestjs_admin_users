
import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/user.dto";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Put('/')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.createUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: 'User Successfully Created',
            user
        });
    }

    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.userService.getUser();
        return res.status(HttpStatus.OK).json(users);
    }
}