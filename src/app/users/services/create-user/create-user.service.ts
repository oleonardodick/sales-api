import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { hashData } from 'src/utils/security/hashData.security';
import { CreateUserInterface } from '../../repositories/create-user.interface';
import { GetUserDto } from '../../dtos/get-user.dto';
import { GetUserService } from '../get-user/get-user.service';
import { Messages } from 'src/utils/messages';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly CreateUserInterface: CreateUserInterface,
    private readonly GetUserService: GetUserService,
  ) {}

  async createUser(userData: CreateUserDto): Promise<GetUserDto> {
    console.log(userData);
    const emailJaUtilizado =
      await this.GetUserService.getUserByEmailWithoutException(userData.email);
    if (emailJaUtilizado) {
      throw new ConflictException(Messages.errors.uniqueEmail);
    }

    userData.senha = await hashData(userData.senha);
    const user = await this.CreateUserInterface.createUser(userData);
    return new GetUserDto(user);
  }
}
