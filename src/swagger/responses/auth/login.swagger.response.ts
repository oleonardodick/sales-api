import { ApiResponseOptions } from '@nestjs/swagger';

export const LoginSwaggerResponse: ApiResponseOptions = {
  description: 'Usuário logado com sucesso',
  schema: {
    type: 'object',
    properties: {
      access_token: {
        type: 'string',
        description: 'Token que deve ser enviado nas requisições',
      },
    },
  },
};
