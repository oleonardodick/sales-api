import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { GetUserService } from 'src/app/users/services/get-user/get-user.service';
import { JwtService } from '@nestjs/jwt';
import { verifyData } from 'src/utils/security/verifyData.security';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { Messages } from 'src/utils/messages';

jest.mock('../../utils/security/verifyData.security');

const usuario: Usuario = {
  id: '1',
  nome: 'testUser1',
  email: 'testuser1@mail.com',
  senha: 'passwordA1',
  telefone: '35410201',
  rua: 'teste',
  numero: 10,
  cep: '93341250',
  cidadeId: '1',
  ativo: true,
  foto: 'foto',
  papel: 'USUARIO',
  dataNascimento: new Date(),
  dataCriacao: new Date(),
  dataAtualizacao: new Date(),
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

    jest.spyOn(getUserService, 'getUserByEmail').mockResolvedValue(usuario);
  });

  it('Deve estar definido', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('Deve retornar o token de acesso', async () => {
      const token = 'test-token';
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);
      const result = await authService.login(usuario);
      expect(result).toEqual({ access_token: token });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: usuario.id,
        email: usuario.email,
        papel: usuario.papel,
      });
    });

    it('Deve retornar o usuário quando as credenciais estão válidas', async () => {
      (verifyData as jest.Mock).mockResolvedValue(true);

      const result = await authService.validateUser(
        'teste@mail.com',
        'password',
      );

      expect(result).toEqual(usuario);
      expect(getUserService.getUserByEmail).toHaveBeenCalledWith(
        'teste@mail.com',
      );
      expect(verifyData).toHaveBeenCalledWith('password', usuario.senha);
    });

    it('Deve disparar erro quando as credenciais estão inválidas', async () => {
      (verifyData as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.validateUser('teste@mail.com', 'wrongPassword'),
      ).rejects.toThrow(
        new UnauthorizedException(Messages.errors.invalidCredentials),
      );
    });

    it('Deve retornar usuário não encontrado', async () => {
      (getUserService.getUserByEmail as jest.Mock).mockRejectedValue(
        new NotFoundException(Messages.errors.userNotFound),
      );

      await expect(
        authService.validateUser('teste@mail.com', 'password'),
      ).rejects.toThrow(new NotFoundException(Messages.errors.userNotFound));
    });
  });
});
