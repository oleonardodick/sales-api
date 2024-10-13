import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UpdateUserService } from '../../services/update-user/update-user.service';

@ApiTags('Users')
@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return { data: await this.updateUserService.updateUser(id, userData) };
  }
}
