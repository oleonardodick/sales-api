import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundExceptionDocumentation } from 'src/utils/documentation/not-found-exception.documentation';
import { AuthGuard } from '@nestjs/passport';
import { GetUserService } from '../services/get-user/get-user.service';
import { GetUserDto } from '../dtos/get-user.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @ApiOperation({ summary: 'Return all users from the database' })
  @ApiOkResponse({
    description: 'The data was returned from the database',
    isArray: true,
    type: GetUserDto,
  })
  @Get()
  async getAllUsers() {
    return await this.getUserService.getAllUsers();
  }

  @ApiOperation({ summary: 'Return a user according to params' })
  @ApiOkResponse({
    description: 'The data was returned sucessfully',
    type: GetUserDto,
  })
  @ApiNotFoundResponse({
    description: 'The user was not found.',
    type: NotFoundExceptionDocumentation,
  })
  @Get('query')
  async getUserByEmail(@Query('email') email: string) {
    return await this.getUserService.getUserWithoutPasswordByEmail(email);
  }

  @ApiOperation({ summary: 'Return a user according to ID' })
  @ApiOkResponse({
    description: 'The data was returned sucessfully.',
    type: GetUserDto,
  })
  @ApiNotFoundResponse({
    description: 'The user was not found.',
    type: NotFoundExceptionDocumentation,
  })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.getUserService.getUserById(id);
  }
}
