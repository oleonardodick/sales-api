import { User } from '@prisma/client';

export abstract class GetUserInterface {
  abstract getAllUsers(): Promise<User[]>;
  abstract getUserById(id: string): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User>;
}
