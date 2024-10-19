import { PrismaService } from 'src/database/prisma.service';
import { GetUserInterface } from '../get-user.interface';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserRepository implements GetUserInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
  async getUserById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { email: email },
    });
  }
}
