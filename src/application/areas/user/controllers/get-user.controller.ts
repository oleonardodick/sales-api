import { Controller, Get, Param } from '@nestjs/common';
import { GetUserService } from '../services/get-user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class GetUserController {
  constructor(private getUserService: GetUserService) {}

  @Get()
  getAllUsers() {
    return this.getUserService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.getUserService.getUserById(id);
  }
}
