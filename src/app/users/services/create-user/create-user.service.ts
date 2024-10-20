import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { hashData } from 'src/utils/security/hashData.security';
import { CreateUserInterface } from '../../repositories/create-user.interface';
import { GetUserDto } from '../../dtos/get-user.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly CreateUserInterface: CreateUserInterface) {}

  async createUser(userData: CreateUserDto): Promise<GetUserDto> {
    userData.password = await hashData(userData.password);
    const user = await this.CreateUserInterface.createUser(userData);
    return new GetUserDto(user);
  }
}
