import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserRepository } from '../../repositories/create-user.repository';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { GetUserDto } from '../../dtos/get-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hashData } from 'src/utils/security/hashData.security';

@Injectable()
export class CreateUserService implements CreateUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<GetUserDto> {
    try {
      userData.password = await hashData(userData.password);
      const user = await this.prisma.user.create({
        data: {
          ...userData,
        },
      });
      return new GetUserDto(user);
    } catch (error: any) {
      throw new InternalServerErrorException(error);
    }
  }
}
