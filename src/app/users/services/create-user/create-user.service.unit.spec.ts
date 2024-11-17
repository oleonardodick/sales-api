import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { CreateUserInterface } from '../../repositories/create-user.interface';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { hashData } from 'src/utils/security/hashData.security';
import { GetUserDto } from '../../dtos/get-user.dto';
import { Usuario } from '@prisma/client';

jest.mock('../../../../utils/security/hashData.security');

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

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let createUserInterface: CreateUserInterface;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: CreateUserInterface,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserService = module.get<CreateUserService>(CreateUserService);
    createUserInterface = module.get<CreateUserInterface>(CreateUserInterface);
  });

  it('Deve estar definido', () => {
    expect(createUserService).toBeDefined();
    expect(createUserInterface).toBeDefined();
  });

  it('Deve criar um usuário', async () => {
    const hashedPassword = 'hashedPassword';
    const usuarioParaCriacao: CreateUserDto = {
      nome: 'testUser1',
      email: 'testuser1@mail.com',
      senha: 'password1',
      cidade: '1',
    };

    (hashData as jest.Mock).mockResolvedValue(hashedPassword);
    (createUserInterface.createUser as jest.Mock).mockResolvedValue(usuario);

    const result = await createUserService.createUser(usuarioParaCriacao);

    expect(hashData).toHaveBeenCalledWith('password1');
    expect(createUserInterface.createUser).toHaveBeenCalledWith(
      usuarioParaCriacao,
    );
    expect(result).toEqual(new GetUserDto(usuario));
  });
});
