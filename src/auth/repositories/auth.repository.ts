import { Usuario } from '@prisma/client';

export abstract class AuthRepository {
  abstract login(usuario: Usuario): Promise<{ access_token: string }>;
}
