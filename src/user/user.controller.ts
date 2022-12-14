
import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/user.dto";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { S3Service } from '../s3-service/s3-service.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private s3Service: S3Service) { }

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

    @UseGuards(JwtAuthGuard)
    @Put('avatar/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Res() res, @UploadedFile() file: Express.Multer.File, @Param('id') id) {
        const user = await this.userService.getUserById(id);
        if (user) {
            const result = await this.s3Service.uploadFile(file);
            if(result.Location) {
                const createUserDTO: CreateUserDTO = {
                    image: result.Location,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    user: user.user,
                    password: user.password,
                    createdAt: user.createdAt,
                }
                const userUpdated = await this.userService.updateUser(id, createUserDTO);

                return res.status(HttpStatus.OK).json(userUpdated);
            }
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'User Not Found',
            });
        }
    }     
}