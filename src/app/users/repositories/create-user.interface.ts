import { Usuario } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';

export abstract class CreateUserInterface {
  abstract createUser(userData: CreateUserDto): Promise<Usuario>;
}
