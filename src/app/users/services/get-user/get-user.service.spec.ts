import { Test, TestingModule } from '@nestjs/testing';
import { GetUserService } from './get-user.service';
import { User } from '@prisma/client';
import { GetUserInterface } from '../../repositories/get-user.interface';
import { GetUserDto } from '../../dtos/get-user.dto';
import { NotFoundException } from '@nestjs/common';

const user1: User = {
  id: '1',
  name: 'testUser1',
  email: 'testuser1@mail.com',
  password: 'password1',
  role: 'USER',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user2: User = {
  id: '2',
  name: 'testUser2',
  email: 'testuser2@mail.com',
  password: 'password2',
  role: 'ADMIN',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const users: User[] = [user1, user2];

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

  it('should be defined', () => {
    expect(getUserService).toBeDefined();
    expect(getUserInterface).toBeDefined();
  });

  describe('GetAllUsers', () => {
    it('should return a list of users', async () => {
      (getUserInterface.getAllUsers as jest.Mock).mockResolvedValue(users);

      const result = await getUserService.getAllUsers();

      expect(getUserInterface.getAllUsers).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        new GetUserDto(users[0]),
        new GetUserDto(users[1]),
      ]);
    });

    it('should return empty when it has no users in the DB', async () => {
      (getUserInterface.getAllUsers as jest.Mock).mockResolvedValue([]);

      const result = await getUserService.getAllUsers();
      expect(result).toHaveLength(0);
    });
  });

  describe('GetUserById', () => {
    it("should return an user by it's ID", async () => {
      (getUserInterface.getUserById as jest.Mock).mockResolvedValue(user1);

      const result = await getUserService.getUserById(user1.id);

      expect(getUserInterface.getUserById).toHaveBeenCalledWith(user1.id);
      expect(result).toEqual(new GetUserDto(user1));
    });

    it('should return user not found', async () => {
      (getUserInterface.getUserById as jest.Mock).mockResolvedValue(null);

      await expect(getUserService.getUserById('5')).rejects.toThrow(
        new NotFoundException('User not found.'),
      );
    });
  });

  describe('GetUserByEmail', () => {
    it("should return an user by it's e-mail", async () => {
      (getUserInterface.getUserByEmail as jest.Mock).mockResolvedValue(user1);
      const result = await getUserService.getUserByEmail(user1.email);
      expect(getUserInterface.getUserByEmail).toHaveBeenCalledWith(user1.email);
      expect(result).toEqual(user1);
    });

    it("should return an user by it's e-mail without the password", async () => {
      (getUserInterface.getUserByEmail as jest.Mock).mockResolvedValue(user1);
      const result = await getUserService.getUserWithoutPasswordByEmail(
        user1.email,
      );
      expect(getUserInterface.getUserByEmail).toHaveBeenCalledWith(user1.email);
      expect(result).not.toHaveProperty('password');
      expect(result).toEqual(new GetUserDto(user1));
    });

    it('should return user not found in the method that returns the password', async () => {
      (getUserInterface.getUserByEmail as jest.Mock).mockResolvedValue(null);
      await expect(
        getUserService.getUserByEmail('test@mail.com'),
      ).rejects.toThrow(new NotFoundException('User not found.'));
    });

    it('should return user not found in the method that not returns the password', async () => {
      (getUserInterface.getUserByEmail as jest.Mock).mockResolvedValue(null);
      await expect(
        getUserService.getUserWithoutPasswordByEmail('test@mail.com'),
      ).rejects.toThrow(new NotFoundException('User not found.'));
    });
  });
});
