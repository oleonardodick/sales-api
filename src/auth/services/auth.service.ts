import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '@prisma/client';
import { GetUserService } from 'src/app/users/services/get-user/get-user.service';
import { verifyData } from 'src/utils/security/verifyData.security';
import { AuthRepository } from '../repositories/auth.repository';
import { Messages } from 'src/utils/messages';

@Injectable()
export class AuthService implements AuthRepository {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(usuario: Usuario): Promise<{ access_token: string }> {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      papel: usuario.papel,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<Usuario> {
    const usuario = await this.getUserService.getUserByEmail(email);
    const isAutenticated = await verifyData(password, usuario.senha);

    if (!isAutenticated) {
      throw new UnauthorizedException(Messages.errors.invalidCredentials);
    } else {
      return usuario;
    }
  }
}
