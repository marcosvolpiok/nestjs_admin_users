
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { ResponseService } from '../response/response.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private responseService: ResponseService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      const result = await this.authService.login(req.user);
      return this.responseService.getResponse(result, 'OK');
    } catch (error) {
      return this.responseService.getResponse({}, 'ERROR', error.message);
    }
  } 
}