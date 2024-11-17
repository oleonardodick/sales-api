import { ApiResponseOptions } from '@nestjs/swagger';
import { Messages } from 'src/utils/messages';

export const InvalidCredentialsSwaggerResponse: ApiResponseOptions = {
  description: 'Credenciais inválidas',
  schema: {
    example: {
      message: Messages.errors.invalidCredentials,
      error: 'Unauthorized',
      statusCode: 401,
    },
  },
};
