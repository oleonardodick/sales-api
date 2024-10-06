import { PrismaService } from 'src/application/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserInteface } from '../interfaces/create-user-repository.interface';
import { UserResponseDto } from '../../dtos/user-response.dto';
import { User } from '@prisma/client';

@Injectable()
export class CreateUserRepository implements CreateUserInteface {
  constructor(private prisma: PrismaService) {}

  private mapUserToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    const userCreated = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return this.mapUserToDto(userCreated);
  }
}
