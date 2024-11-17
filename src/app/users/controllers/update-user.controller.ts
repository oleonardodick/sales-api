import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { Papeis } from 'src/utils/decorators/roles.decorator';
import { Papel } from '@prisma/client';
import { UpdateUserService } from '../services/update-user/update-user.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserNotFoundSwaggerResponse } from 'src/swagger/responses/users/user-not-found.swagger.response';
import { UnauthorizedSwaggerResponse } from 'src/swagger/responses/auth/unauthorized.swagger.response';
import { ForbiddenSwaggerResponse } from 'src/swagger/responses/forbidden.swagger.response';

@ApiTags('Usuarios')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('usuarios')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @ApiOperation({ summary: 'Atualiza um usuário de acordo com o ID passado.' })
  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'Usuário atualizado com sucesso',
  })
  @ApiNotFoundResponse(UserNotFoundSwaggerResponse)
  @ApiUnauthorizedResponse(UnauthorizedSwaggerResponse)
  @ApiForbiddenResponse(ForbiddenSwaggerResponse)
  @Papeis(Papel.ADMINISTRADOR)
  @Put(':id')
  @HttpCode(204)
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return await this.updateUserService.updateUser(id, userData);
  }
}
