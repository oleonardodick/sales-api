import { User } from '@prisma/client';

export abstract class AuthRepository {
  abstract login(user: User): Promise<{ access_token: string }>;
}
