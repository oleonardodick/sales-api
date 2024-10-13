import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUserDto } from '../dtos/get-user.dto';

export abstract class CreateUserRepository {
  abstract createUser(userData: CreateUserDto): Promise<GetUserDto>;
}
