
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { S3Service } from './s3-service/s3-service.service';
@Controller()
export class AppController {
  constructor(private authService: AuthService, private s3Service: S3Service) {}

  @UseGuards(LocalAuthGuard)

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  } 
}