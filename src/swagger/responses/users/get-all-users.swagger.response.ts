import { ApiResponseOptions } from '@nestjs/swagger';
import { GetUserDto } from 'src/app/users/dtos/get-user.dto';

export const GetAllUsersSwaggerResponse: ApiResponseOptions = {
  description: 'Os dados foram retornados do banco de dados',
  isArray: true,
  type: GetUserDto,
};
