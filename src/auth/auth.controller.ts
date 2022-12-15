
import { Controller, Request, Post, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { ResponseService } from '../response/response.service';
import { ResponseInterface } from '../response/response.interface';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private responseService: ResponseService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res() res, @Request() req) {
    try {
      const result = await this.authService.login(req.user);
      return this.responseService.getResponse(result, 'OK');
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
        this.responseService.getResponse(error.message, 'ERROR')
      );
    }
  } 
}