import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { GetUserService } from 'src/app/users/services/get-user/get-user.service';
import { verifyData } from 'src/utils/security/verifyData.security';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService implements AuthRepository {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.getUserService.getUserByEmail(email);
    const isAutenticated = await verifyData(password, user.password);

    if (!isAutenticated) {
      throw new UnauthorizedException('E-mail or password invalid.');
    } else {
      return user;
    }
  }
}
