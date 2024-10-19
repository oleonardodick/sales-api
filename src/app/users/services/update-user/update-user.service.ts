import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UpdateUserInterface } from '../../repositories/update-user.interface';
import { GetUserService } from '../get-user/get-user.service';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly UpdateUserInterface: UpdateUserInterface,
    private readonly GetUserService: GetUserService,
  ) {}

  async updateUser(id: string, userData: UpdateUserDto): Promise<void> {
    await this.GetUserService.getUserById(id);
    await this.UpdateUserInterface.updateUser(id, userData);
  }
}
