import { PrismaService } from 'src/application/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserInteface } from '../interfaces/create-user-repository.interface';

@Injectable()
export class CreateUserRepository implements CreateUserInteface {
  constructor(private prisma: PrismaService) {}

  async create(name: string, email: string, password: string): Promise<void> {
    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
