import { Injectable } from '@nestjs/common';
import { UpdateUserRepository } from '../../repositories/update-user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { GetUserDto } from '../../dtos/get-user.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { GetUserService } from '../get-user/get-user.service';

@Injectable()
export class UpdateUserService implements UpdateUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly getUserService: GetUserService,
  ) {}

  async updateUser(id: string, userData: UpdateUserDto): Promise<GetUserDto> {
    this.getUserService.getUserById(id);

    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...userData,
      },
    });

    return new GetUserDto(user);
  }
}
