import { Injectable } from '@nestjs/common';
import { GetUserInterface } from '../repositories/interfaces/get-user-repository.interface';

@Injectable()
export class GetUserService {
  constructor(private getUserInterface: GetUserInterface) {}

  getAllUsers() {
    return this.getUserInterface.getAll();
  }

  getUserById(id: string) {
    return this.getUserInterface.getById(id);
  }
}
