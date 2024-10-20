import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetUserDto } from '../dtos/get-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserService } from '../services/create-user/create-user.service';

@ApiTags('Users')
@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @ApiOperation({ summary: 'Add a new user to the database' })
  @ApiCreatedResponse({
    type: GetUserDto,
    description: 'The user was created sucessfully',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Data to be used when adding a new user.',
  })
  @Roles(Role.ADMIN)
  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return { data: await this.createUserService.createUser(userData) };
  }
}
