import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUserInterface } from '../../repositories/get-user.interface';
import { GetUserDto } from '../../dtos/get-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class GetUserService {
  constructor(private readonly GetUserInterface: GetUserInterface) {}

  async getAllUsers(): Promise<GetUserDto[]> {
    const users = await this.GetUserInterface.getAllUsers();
    return users.map((user) => new GetUserDto(user));
  }

  async getUserById(id: string): Promise<GetUserDto> {
    const user = await this.GetUserInterface.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return new GetUserDto(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.GetUserInterface.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async getUserWithoutPasswordByEmail(email: string): Promise<GetUserDto> {
    return new GetUserDto(await this.getUserByEmail(email));
  }
}
