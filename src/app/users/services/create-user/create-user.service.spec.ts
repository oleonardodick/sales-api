import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { CreateUserInterface } from '../../repositories/create-user.interface';
import { User } from '@prisma/client';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { hashData } from 'src/utils/security/hashData.security';
import { GetUserDto } from '../../dtos/get-user.dto';

jest.mock('../../../../utils/security/hashData.security');

const user: User = {
  id: '1',
  name: 'testUser1',
  email: 'testuser1@mail.com',
  password: 'password1',
  role: 'USER',
  createdAt: new Date(),
  updatedAt: new Date(),
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

  it('should be defined', () => {
    expect(createUserService).toBeDefined();
    expect(createUserInterface).toBeDefined();
  });

  it('should create an user', async () => {
    const hashedPassword = 'hashedPassword';
    const userToCreate: CreateUserDto = {
      name: 'testUser1',
      email: 'testuser1@mail.com',
      password: 'password1',
      role: 'ADMIN',
    };

    (hashData as jest.Mock).mockResolvedValue(hashedPassword);
    (createUserInterface.createUser as jest.Mock).mockResolvedValue(user);

    const result = await createUserService.createUser(userToCreate);

    /*during the execution of createUser, the object userToCreate was modified
    by the function hashData, changing the password to the hashed password.*/
    expect(hashData).toHaveBeenCalledWith('password1');
    expect(createUserInterface.createUser).toHaveBeenCalledWith(userToCreate);
    expect(result).toEqual(new GetUserDto(user));
  });
});
