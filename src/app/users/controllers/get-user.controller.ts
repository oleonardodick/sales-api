import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundExceptionDocumentation } from 'src/utils/documentation/not-found-exception.documentation';
import { AuthGuard } from '@nestjs/passport';
import { GetUserService } from '../services/get-user/get-user.service';
import { GetUserDto } from '../dtos/get-user.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
@UseGuards(AuthGuard('jwt'))
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @ApiOperation({ summary: 'Busca todos os usuários do banco de dados' })
  @ApiOkResponse({
    description: 'Os dados foram retornados do banco de dados',
    isArray: true,
    type: GetUserDto,
  })
  @ApiBearerAuth()
  @Get()
  async getAllUsers() {
    return await this.getUserService.getAllUsers();
  }

  @ApiOperation({
    summary: 'Busca um usuário de acordo com os parâmetros enviados.',
  })
  @ApiOkResponse({
    description: 'Os dados foram retornados com sucesso.',
    type: GetUserDto,
  })
  @ApiNotFoundResponse({
    description: 'O usuário não foi encontrado.',
    type: NotFoundExceptionDocumentation,
  })
  @Get('query')
  async getUserByEmail(@Query('email') email: string) {
    return await this.getUserService.getUserWithoutPasswordByEmail(email);
  }

  @ApiOperation({ summary: 'Busca um usuário de acordo com o ID passado.' })
  @ApiOkResponse({
    description: 'Dados retornados com sucesso.',
    type: GetUserDto,
  })
  @ApiNotFoundResponse({
    description: 'O usuário não foi encontrado.',
    type: NotFoundExceptionDocumentation,
  })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.getUserService.getUserById(id);
  }
}
