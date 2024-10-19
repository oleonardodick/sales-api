import { PrismaService } from 'src/database/prisma.service';
import { CreateUserInterface } from '../create-user.interface';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserRepository implements CreateUserInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          ...userData,
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
