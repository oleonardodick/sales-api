import { ApiResponseOptions } from '@nestjs/swagger';
import { Messages } from 'src/utils/messages';

export const ForbiddenSwaggerResponse: ApiResponseOptions = {
  description: 'Usuário sem permissão de acesso',
  schema: {
    example: {
      message: Messages.errors.forbidenAccess,
      error: 'Forbidden',
      statusCode: 403,
    },
  },
};
