import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserService } from '../services/create-user.service';

@Controller('users')
export class CreateUserController {
  constructor(private userService: CreateUserService) {}

  @Post()
  async createUser(@Body() userCreate: CreateUserDto) {
    const { name, email, password } = userCreate;
    await this.userService.createUser(name, email, password);
  }
}
