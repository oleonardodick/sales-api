import { ApiResponseOptions } from '@nestjs/swagger';
import { Messages } from 'src/utils/messages';

export const UniqueEmailSwaggerResponse: ApiResponseOptions = {
  description: 'E-mail já cadastrado para outro usuário',
  schema: {
    example: {
      message: Messages.errors.uniqueEmail,
      error: 'ConflictException',
      statusCode: 409,
    },
  },
};
