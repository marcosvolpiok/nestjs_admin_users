
import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UpdateImageDTO } from "./dto/updateImage.dto";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { S3Service } from '../s3-service/s3-service.service';
import { ResponseService } from '../response/response.service';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UpdateUserBodyDTO } from './dto/updateUserBody.dto';

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
        const user = await this.userService.createUser(createUserDTO);
        
        response = res.status(HttpStatus.CREATED).json(
            this.responseService.getResponse(
                {user, message: 'User Successfully Created'}
                , 'OK'
            )
        )

        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async updateUser(@Res() res, @Param() updateUserDTO: UpdateUserDTO, @Body() updateUserBodyDTO: UpdateUserBodyDTO) {
        let response;
        const updatedUser = await this.userService.updateUser(updateUserDTO.id, updateUserBodyDTO);

        response = res.status(HttpStatus.OK).json(
            this.responseService.getResponse(
                updatedUser,
                'OK')
        )

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
    async uploadFile(@Res() res, @UploadedFile() file: Express.Multer.File, @Param() updateUserDTO: UpdateUserDTO) {
        let response;
        const result = await this.s3Service.uploadFile(file);
        
        if(result.Location) {
            const updateImageDTO: UpdateImageDTO = {
                image: result.Location
            }
            const userUpdated = await this.userService.updateImage(updateUserDTO.id, updateImageDTO);

            response = res.status(HttpStatus.OK).json(
                this.responseService.getResponse(
                    userUpdated,
                    'OK')
            )
        }

        return response;
    }     
}