import { Usuario } from '@prisma/client';

export abstract class GetUserInterface {
  abstract getAllUsers(): Promise<Usuario[]>;
  abstract getUserById(id: string): Promise<Usuario>;
  abstract getUserByEmail(email: string): Promise<Usuario>;
}
