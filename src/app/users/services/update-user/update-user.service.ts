import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UpdateUserInterface } from '../../repositories/update-user.interface';
import { GetUserInterface } from '../../repositories/get-user.interface';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly UpdateUserInterface: UpdateUserInterface,
    private readonly GetUserInterface: GetUserInterface,
  ) {}

  async updateUser(id: string, userData: UpdateUserDto): Promise<void> {
    await this.GetUserInterface.getUserById(id);
    await this.UpdateUserInterface.updateUser(id, userData);
  }
}
