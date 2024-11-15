import { PrismaService } from 'src/database/prisma.service';
import { GetUserInterface } from '../get-user.interface';
import { Usuario } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserRepository implements GetUserInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<Usuario[]> {
    return await this.prisma.usuario.findMany();
  }
  async getUserById(id: string): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({
      where: { id: id },
    });
  }
  async getUserByEmail(email: string): Promise<Usuario> {
    return await this.prisma.usuario.findFirst({
      where: { email: email },
    });
  }
}
