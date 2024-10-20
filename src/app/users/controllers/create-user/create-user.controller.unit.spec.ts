import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from './create-user.controller';
import { CreateUserService } from '../../services/create-user/create-user.service';
import { GetUserDto } from '../../dtos/get-user.dto';
import { CreateUserDto } from '../../dtos/create-user.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('CreateUserController', () => {
  let createUserController: CreateUserController;
  let createUserService: CreateUserService;

  const mockCreateUserService = {
    createUser: jest.fn().mockResolvedValue({
      id: '1',
      name: 'Test User',
      email: 'teste@mail.com',
    } as GetUserDto),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserService,
          useValue: mockCreateUserService,
        },
      ],
    }).compile();

    createUserController =
      module.get<CreateUserController>(CreateUserController);
    createUserService = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(createUserController).toBeDefined();
  });

  it('should create a user', async () => {
    const userData: CreateUserDto = {
      name: 'User test',
      email: 'teste@mail.com',
      password: 'password',
      role: 'USER',
    };

    const response = await createUserController.createUser(userData);
    expect(createUserService.createUser).toHaveBeenCalledWith(userData);
    expect(response).toEqual({
      data: { id: '1', name: 'Test User', email: 'teste@mail.com' },
    });
  });

  it('should handle errors from service', async () => {
    jest
      .spyOn(createUserService, 'createUser')
      .mockRejectedValue(new InternalServerErrorException('Any error'));

    const userData: CreateUserDto = {
      name: 'User test',
      email: 'teste@mail.com',
      password: 'password',
      role: 'USER',
    };

    await expect(createUserController.createUser(userData)).rejects.toThrow(
      'Any error',
    );
  });
});
