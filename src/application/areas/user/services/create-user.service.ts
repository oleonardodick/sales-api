import { Injectable } from '@nestjs/common';
import { CreateUserInteface } from '../repositories/interfaces/create-user-repository.interface';
import { UserResponseDto } from '../dtos/user-response.dto';

@Injectable()
export class CreateUserService {
  constructor(private createUserInterface: CreateUserInteface) {}

  createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    return this.createUserInterface.create(name, email, password);
  }
}
