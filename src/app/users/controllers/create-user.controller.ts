import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Papeis } from 'src/utils/decorators/roles.decorator';
import { Papel } from '@prisma/client';
import { GetUserDto } from '../dtos/get-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserService } from '../services/create-user/create-user.service';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Usuarios')
@Controller('usuarios')
@UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @Papeis(Papel.ADMINISTRADOR)
  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return await this.createUserService.createUser(userData);
  }
}
