import { ApiResponseOptions } from '@nestjs/swagger';
import { Messages } from 'src/utils/messages';

export const UserNotFoundSwaggerResponse: ApiResponseOptions = {
  description: 'Usuário não encontrado',
  schema: {
    example: {
      message: Messages.errors.userNotFound,
      error: 'Not Found',
      statusCode: 404,
    },
  },
};
