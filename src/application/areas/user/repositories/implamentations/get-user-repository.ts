import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUserInterface } from '../interfaces/get-user-repository.interface';
import { UserDetailsDto } from '../../dtos/user-details.dto';
import { PrismaService } from 'src/application/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class GetUserRepository implements GetUserInterface {
  constructor(private prisma: PrismaService) {}

  private mapUserToDto(user: User): UserDetailsDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  async getAll(): Promise<{ users: UserDetailsDto[] }> {
    const users = await this.prisma.user.findMany();
    const usersDtos = users.map((user) => this.mapUserToDto(user));
    return { users: usersDtos };
  }

  async getById(id: string): Promise<UserDetailsDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.mapUserToDto(user);
  }
}
