import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from 'src/utils/decorators/roles.decorator';
import { Papel } from '@prisma/client';
import { GetUserDto } from '../dtos/get-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserService } from '../services/create-user/create-user.service';

@ApiTags('Usuarios')
@Controller('usuarios')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @ApiOperation({ summary: 'Adiciona um novo usuário ao banco de dados' })
  @ApiCreatedResponse({
    type: GetUserDto,
    description: 'O usuário foi criado com sucesso',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Dados que serão utilizados na criação do usuário.',
  })
  @Roles(Papel.ADMINISTRADOR)
  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return await this.createUserService.createUser(userData);
  }
}
