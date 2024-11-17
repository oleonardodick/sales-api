import { ApiResponseOptions } from '@nestjs/swagger';
import { Messages } from 'src/utils/messages';

export const UnauthorizedSwaggerResponse: ApiResponseOptions = {
  description: 'Credenciais inválidas',
  schema: {
    example: {
      message: [
        Messages.errors.invalidToken,
        Messages.errors.fieldRequired('token JWT'),
      ],
      error: 'Unauthorized',
      statusCode: 401,
    },
  },
};
