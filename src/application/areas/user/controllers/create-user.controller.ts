import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserService } from '../services/create-user.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from '../dtos/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class CreateUserController {
  constructor(private userService: CreateUserService) {}

  @ApiOperation({ summary: 'Add a new user to the database' })
  @ApiCreatedResponse({
    description: 'The user was created.',
    type: UserResponseDto,
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Data to be used when adding a new user.',
  })
  @Post()
  async createUser(
    @Body() userCreate: CreateUserDto,
  ): Promise<UserResponseDto> {
    const { name, email, password } = userCreate;
    return this.userService.createUser(name, email, password);
  }
}
