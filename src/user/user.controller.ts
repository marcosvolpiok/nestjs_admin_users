
import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UpdateImageDTO } from "./dto/updateImage.dto";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { S3Service } from '../s3-service/s3-service.service';
import { ResponseService } from '../response/response.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private s3Service: S3Service,
        private responseService: ResponseService
    ) { }

    @Post('/')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        let response;

        if (await this.userService.getUserByUsername(createUserDTO.user)) {
            response = res.status(HttpStatus.BAD_REQUEST).json({
                message: 'User Already Exists',
            });
        } else {
            const user = await this.userService.createUser(createUserDTO);
            
            response = res.status(HttpStatus.CREATED).json(
                this.responseService.getResponse(
                    {user, message: 'User Successfully Created'}
                    , 'OK'
                )
            )
        }

        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async updateUser(@Res() res, @Param('id') id, @Body() createUserDTO: CreateUserDTO) {
        let response;

        if (await this.userService.getUserById(id)) {
            const updatedUser = await this.userService.updateUser(id, createUserDTO);

            response = res.status(HttpStatus.OK).json(
                this.responseService.getResponse(
                    updatedUser,
                    'OK')
            )
        } else {
            response = res.status(HttpStatus.NOT_FOUND).json({
                message: 'User Not Found',
            });
        }

        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getUsers(@Res() res) {
        let response;
        const users = await this.userService.getUser();

        response = res.status(HttpStatus.OK).json(
            this.responseService.getResponse(
                users,
                'OK')
        )
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Put('avatar/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Res() res, @UploadedFile() file: Express.Multer.File, @Param('id') id) {
        let response;
        const user = await this.userService.getUserById(id);

        if (user) {
            const result = await this.s3Service.uploadFile(file);
            if(result.Location) {
                const updateImageDTO: UpdateImageDTO = {
                    image: result.Location
                }
                const userUpdated = await this.userService.updateImage(id, updateImageDTO);

                response = res.status(HttpStatus.OK).json(
                    this.responseService.getResponse(
                        userUpdated,
                        'OK')
                )
            }
        } else {
            response = res.status(HttpStatus.NOT_FOUND).json({
                message: 'User Not Found',
            });
        }

        return response;
    }     
}