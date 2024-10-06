import { Injectable } from '@nestjs/common';
import { CreateUserInteface } from '../repositories/interfaces/create-user-repository.interface';

@Injectable()
export class CreateUserService {
  constructor(private createUserInterface: CreateUserInteface) {}

  createUser(name: string, email: string, password: string) {
    this.createUserInterface.create(name, email, password);
  }
}
