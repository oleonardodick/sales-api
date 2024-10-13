import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUserRepository } from '../../repositories/get-user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class GetUserService implements GetUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found with this ID');
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found with this e-mail');
    }
    return user;
  }
}
