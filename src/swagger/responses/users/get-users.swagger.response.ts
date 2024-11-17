import { ApiResponseOptions } from '@nestjs/swagger';
import { GetUserDto } from 'src/app/users/dtos/get-user.dto';

export const GetUserSwaggerResponse: ApiResponseOptions = {
  description: 'O usuário foi retornado com sucesso.',
  type: GetUserDto,
};
