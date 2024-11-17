import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Usuario } from '@prisma/client';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
    });
  }

  async validate(email: string, senha: string): Promise<Usuario> {
    const loginDto: LoginDto = { email, senha };
    return await this.authService.validateUser(loginDto);
  }
}
