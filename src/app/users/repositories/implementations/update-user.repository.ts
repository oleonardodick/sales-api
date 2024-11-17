import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserInterface } from '../update-user.interface';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserRepository implements UpdateUserInterface {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(id: string, userData: UpdateUserDto): Promise<void> {
    await this.prisma.usuario.update({
      where: { id: id },
      data: {
        ...userData,
        ...(userData.cidade && {
          cidade: {
            connect: {
              id: userData.cidade,
            },
          },
        }),
      },
    });
  }
}
