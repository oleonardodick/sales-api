import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Papeis } from 'src/utils/decorators/roles.decorator';
import { Papel } from '@prisma/client';
import { GetUserDto } from '../dtos/get-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserService } from '../services/create-user/create-user.service';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UniqueEmailSwaggerResponse } from 'src/swagger/responses/users/unique-email.swagger.response';
import { UnauthorizedSwaggerResponse } from 'src/swagger/responses/auth/unauthorized.swagger.response';
import { ForbiddenSwaggerResponse } from 'src/swagger/responses/forbidden.swagger.response';

@ApiTags('Usuarios')
@Controller('usuarios')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @ApiOperation({ summary: 'Adiciona um novo usuário ao banco de dados' })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: GetUserDto,
    description: 'O usuário foi criado com sucesso',
  })
  @ApiConflictResponse(UniqueEmailSwaggerResponse)
  @ApiUnauthorizedResponse(UnauthorizedSwaggerResponse)
  @ApiForbiddenResponse(ForbiddenSwaggerResponse)
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
