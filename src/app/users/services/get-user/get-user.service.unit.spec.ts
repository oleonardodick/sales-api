import { Test, TestingModule } from '@nestjs/testing';
import { GetUserService } from './get-user.service';
import { GetUserInterface } from '../../repositories/get-user.interface';
import { GetUserDto } from '../../dtos/get-user.dto';
import { NotFoundException } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { Messages } from 'src/utils/messages';

const usuario1: Usuario = {
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

const usuario2: Usuario = {
  id: '2',
  nome: 'testUser2',
  email: 'testuser2@mail.com',
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

const usuarios: Usuario[] = [usuario1, usuario2];

describe('GetUserService', () => {
  let getUserService: GetUserService;
  let getUserInterface: GetUserInterface;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserService,
        {
          provide: GetUserInterface,
          useValue: {
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            getUserByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    getUserService = module.get<GetUserService>(GetUserService);
    getUserInterface = module.get<GetUserInterface>(GetUserInterface);
  });

  it('Deve estar definido', () => {
    expect(getUserService).toBeDefined();
    expect(getUserInterface).toBeDefined();
  });

  describe('GetAllUsers', () => {
    it('Deve retornar uma lista de usuários', async () => {
      (getUserInterface.getAllUsers as jest.Mock).mockResolvedValue(usuarios);

      const result = await getUserService.getAllUsers();

      expect(getUserInterface.getAllUsers).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        new GetUserDto(usuarios[0]),
        new GetUserDto(usuarios[1]),
      ]);
    });

    it('Deve retornar em branco quando não tiver nenhum usuário no BD', async () => {
      (getUserInterface.getAllUsers as jest.Mock).mockResolvedValue([]);

      const result = await getUserService.getAllUsers();
      expect(result).toHaveLength(0);
    });
  });

  describe('GetUserById', () => {
    it('Deve retornar um usuário pelo seu ID', async () => {
      (getUserInterface.getUserById as jest.Mock).mockResolvedValue(usuario1);

      const result = await getUserService.getUserById(usuario1.id);

      expect(getUserInterface.getUserById).toHaveBeenCalledWith(usuario1.id);
      expect(result).toEqual(new GetUserDto(usuario1));
    });

    it('Deve retornar usuário não encontrado', async () => {
      (getUserInterface.getUserById as jest.Mock).mockResolvedValue(null);

      await expect(getUserService.getUserById('5')).rejects.toThrow(
        new NotFoundException(Messages.errors.userNotFound),
      );
    });
  });

  describe('GetUserByEmail', () => {
    it('Deve retornar um usuário pelo seu e-mail, com a senha', async () => {
      (getUserInterface.getUserByEmail as jest.Mock).mockResolvedValue(
        usuario1,
      );
      const result = await getUserService.getUserByEmail(usuario1.email);
      expect(getUserInterface.getUserByEmail).toHaveBeenCalledWith(
        usuario1.email,
      );
      expect(result).toHaveProperty('senha');
      expect(result).toEqual(usuario1);
    });

    it('Deve retornar um usuário pelo seu e-mail, sem a senha', async () => {
      (getUserInterface.getUserByEmail as jest.Mock).mockResolvedValue(
        usuario1,
      );
      const result = await getUserService.getUserWithoutPasswordByEmail(
        usuario1.email,
      );
      expect(getUserInterface.getUserByEmail).toHaveBeenCalledWith(
        usuario1.email,
      );
      expect(result).not.toHaveProperty('senha');
      expect(result).toEqual(new GetUserDto(usuario1));
    });

    it('Deve retornar usuário não encontrado pelo método que retorna a senha.', async () => {
      (getUserInterface.getUserByEmail as jest.Mock).mockResolvedValue(null);
      await expect(
        getUserService.getUserByEmail('test@mail.com'),
      ).rejects.toThrow(new NotFoundException(Messages.errors.userNotFound));
    });

    it('Deve retornar usuário não encontrado pelo método que não retorna a senha', async () => {
      (getUserInterface.getUserByEmail as jest.Mock).mockResolvedValue(null);
      await expect(
        getUserService.getUserWithoutPasswordByEmail('test@mail.com'),
      ).rejects.toThrow(new NotFoundException(Messages.errors.userNotFound));
    });
  });
});
