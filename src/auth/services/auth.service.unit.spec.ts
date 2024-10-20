import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { GetUserService } from 'src/app/users/services/get-user/get-user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { verifyData } from 'src/utils/security/verifyData.security';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

jest.mock('../../utils/security/verifyData.security');

const user: User = {
  id: '1',
  name: 'testUser',
  email: 'teste@mail.com',
  password: 'password',
  role: 'USER',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AuthService', () => {
  let authService: AuthService;
  let getUserService: GetUserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: GetUserService,
          useValue: {
            getUserByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    getUserService = module.get<GetUserService>(GetUserService);
    jwtService = module.get<JwtService>(JwtService);

    jest.spyOn(getUserService, 'getUserByEmail').mockResolvedValue(user);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const token = 'test-token';
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);
      const result = await authService.login(user);
      expect(result).toEqual({ access_token: token });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email,
        role: user.role,
      });
    });

    it('should return the user if credentials are valid', async () => {
      (verifyData as jest.Mock).mockResolvedValue(true);

      const result = await authService.validateUser(
        'teste@mail.com',
        'password',
      );

      expect(result).toEqual(user);
      expect(getUserService.getUserByEmail).toHaveBeenCalledWith(
        'teste@mail.com',
      );
      expect(verifyData).toHaveBeenCalledWith('password', user.password);
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      (verifyData as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.validateUser('teste@mail.com', 'wrongPassword'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return user not found', async () => {
      (getUserService.getUserByEmail as jest.Mock).mockRejectedValue(
        new NotFoundException('User not found.'),
      );

      await expect(
        authService.validateUser('teste@mail.com', 'password'),
      ).rejects.toThrow(new NotFoundException('User not found.'));
    });
  });
});
