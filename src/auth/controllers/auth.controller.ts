import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginSwaggerResponse } from 'src/swagger/responses/auth/login.swagger.response';
import { LoginDto } from '../dtos/login.dto';
import { InvalidCredentialsSwaggerResponse } from 'src/swagger/responses/auth/invalid-credentials.swagger.response';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Realiza o login na plataforma' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse(LoginSwaggerResponse)
  @ApiUnauthorizedResponse(InvalidCredentialsSwaggerResponse)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
