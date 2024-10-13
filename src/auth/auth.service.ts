import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { GetUserService } from 'src/app/users/services/get-user/get-user.service';
import { verifyData } from 'src/utils/security/verifyData.security';

@Injectable()
export class AuthService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.getUserService.getUserByEmail(email);
    const isAutenticated = await verifyData(password, user.password);

    if (!isAutenticated) {
      throw new UnauthorizedException('E-mail or password invalid.');
    } else {
      return user;
    }
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      acess_token: await this.jwtService.signAsync(payload),
    };
  }
}
