import { PrismaService } from 'src/database/prisma.service';
import { CreateUserInterface } from '../create-user.interface';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { Usuario } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserRepository implements CreateUserInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<Usuario> {
    return await this.prisma.usuario.create({
      data: {
        ...userData,
        cidade: {
          connect: {
            id: userData.cidade,
          },
        },
      },
    });
  }
}
