import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUserInterface } from '../../repositories/get-user.interface';
import { GetUserDto } from '../../dtos/get-user.dto';
import { Usuario } from '@prisma/client';
import { Messages } from 'src/utils/messages';

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
      throw new NotFoundException(Messages.errors.userNotFound);
    }
    return new GetUserDto(user);
  }

  async getUserByEmail(email: string): Promise<Usuario> {
    const user = await this.GetUserInterface.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(Messages.errors.userNotFound);
    }
    return user;
  }

  async getUserWithoutPasswordByEmail(email: string): Promise<GetUserDto> {
    return new GetUserDto(await this.getUserByEmail(email));
  }

  async getUserByEmailWithoutException(email: string): Promise<GetUserDto> {
    return new GetUserDto(await this.GetUserInterface.getUserByEmail(email));
  }
}
