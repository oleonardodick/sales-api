import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UpdateUserService } from '../../services/update-user/update-user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Roles(Role.ADMIN)
  @Put(':id')
  @HttpCode(204)
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return { data: await this.updateUserService.updateUser(id, userData) };
  }
}
