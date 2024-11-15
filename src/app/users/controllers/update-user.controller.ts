import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Papel } from '@prisma/client';
import { UpdateUserService } from '../services/update-user/update-user.service';
import { UpdateUserDto } from '../dtos/update-user.dto';

@ApiTags('Users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Roles(Papel.ADMINISTRADOR)
  @Put(':id')
  @HttpCode(204)
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return await this.updateUserService.updateUser(id, userData);
  }
}
