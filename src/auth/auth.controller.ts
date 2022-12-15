
import { Controller, Request, Post, UseGuards, Res, HttpStatus } from '@nestjs/common';
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
  async login(@Res() res, @Request() req) {
    let response;

    try {
      const result = await this.authService.login(req.user);
      
      response = res.status(HttpStatus.OK).json(
        this.responseService.getResponse(result, 'OK')
      );
    } catch (error) {
      response = res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
        this.responseService.getResponse(error.message, 'ERROR')
      );
    }

    return response;
  } 
}