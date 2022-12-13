
import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/user.dto";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.createUser(createUserDTO);

        return res.status(HttpStatus.OK).json({
            message: 'User Successfully Created',
            user
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async updateUser(@Res() res, @Param('id') id, @Body() createUserDTO: CreateUserDTO) {
        if (await this.userService.getUserById(id)) {
            const updatedUser = await this.userService.updateUser(id, createUserDTO);

            return res.status(HttpStatus.OK).json(updatedUser);
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'User Not Found',
            });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.userService.getUser();

        return res.status(HttpStatus.OK).json(users);
    }
}