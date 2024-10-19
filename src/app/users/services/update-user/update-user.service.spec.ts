import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserService } from './update-user.service';
import { UpdateUserInterface } from '../../repositories/update-user.interface';
import { GetUserService } from '../get-user/get-user.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { NotFoundException } from '@nestjs/common';

const id = 'testId';
const userData: UpdateUserDto = {
  name: 'updatedUser',
  email: 'updateduser@mail.com',
  role: 'USER',
};

describe('UpdateUserService', () => {
  let updateUserService: UpdateUserService;
  let updateUserInterface: UpdateUserInterface;
  let getUserService: GetUserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: UpdateUserInterface,
          useValue: {
            updateUser: jest.fn(),
          },
        },
        {
          provide: GetUserService,
          useValue: {
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    updateUserService = module.get<UpdateUserService>(UpdateUserService);
    updateUserInterface = module.get<UpdateUserInterface>(UpdateUserInterface);
    getUserService = module.get<GetUserService>(GetUserService);
  });

  it('should be defined', () => {
    expect(updateUserService).toBeDefined();
    expect(updateUserInterface).toBeDefined();
    expect(getUserService).toBeDefined();
  });

  it('should update an user', async () => {
    (getUserService.getUserById as jest.Mock).mockResolvedValue({});
    (updateUserInterface.updateUser as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await updateUserService.updateUser(id, userData);

    expect(getUserService.getUserById).toHaveBeenCalledWith(id);
    expect(updateUserInterface.updateUser).toHaveBeenCalledWith(id, userData);
  });

  it('should return user not found', async () => {
    (getUserService.getUserById as jest.Mock).mockRejectedValue(
      new NotFoundException('User not found.'),
    );

    await expect(updateUserService.updateUser(id, userData)).rejects.toThrow(
      new NotFoundException('User not found.'),
    );
  });
});
