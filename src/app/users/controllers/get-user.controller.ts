import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { GetUserService } from '../services/get-user/get-user.service';
import { GetUserDto } from '../dtos/get-user.dto';
import { Papeis } from 'src/utils/decorators/roles.decorator';
import { Papel } from '@prisma/client';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { GetAllUsersSwaggerResponse } from 'src/swagger/responses/users/get-all-users.swagger.response';
import { GetUserSwaggerResponse } from 'src/swagger/responses/users/get-users.swagger.response';
import { UserNotFoundSwaggerResponse } from 'src/swagger/responses/users/user-not-found.swagger.response';
import { UnauthorizedSwaggerResponse } from 'src/swagger/responses/auth/unauthorized.swagger.response';
import { ForbiddenSwaggerResponse } from 'src/swagger/responses/forbidden.swagger.response';

@ApiTags('Usuarios')
@Controller('usuarios')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @ApiOperation({ summary: 'Busca todos os usuários do banco de dados' })
  @ApiBearerAuth()
  @ApiOkResponse(GetAllUsersSwaggerResponse)
  @ApiUnauthorizedResponse(UnauthorizedSwaggerResponse)
  @ApiForbiddenResponse(ForbiddenSwaggerResponse)
  @Papeis(Papel.ADMINISTRADOR)
  @Get()
  async getAllUsers() {
    return await this.getUserService.getAllUsers();
  }

  @ApiOperation({
    summary: 'Busca um usuário de acordo com os parâmetros enviados.',
  })
  @ApiBearerAuth()
  @ApiOkResponse(GetUserSwaggerResponse)
  @ApiNotFoundResponse(UserNotFoundSwaggerResponse)
  @ApiUnauthorizedResponse(UnauthorizedSwaggerResponse)
  @ApiForbiddenResponse(ForbiddenSwaggerResponse)
  @Papeis(Papel.ADMINISTRADOR)
  @Get('query')
  async getUserByEmail(@Query('email') email: string) {
    return await this.getUserService.getUserWithoutPasswordByEmail(email);
  }

  @ApiOperation({ summary: 'Busca um usuário de acordo com o ID passado.' })
  @ApiBearerAuth()
  @ApiOkResponse(GetUserSwaggerResponse)
  @ApiNotFoundResponse(UserNotFoundSwaggerResponse)
  @ApiUnauthorizedResponse(UnauthorizedSwaggerResponse)
  @ApiForbiddenResponse(ForbiddenSwaggerResponse)
  @Papeis(Papel.ADMINISTRADOR)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.getUserService.getUserById(id);
  }
}
