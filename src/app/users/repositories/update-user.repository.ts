import { GetUserDto } from '../dtos/get-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export abstract class UpdateUserRepository {
  abstract updateUser(id: string, userData: UpdateUserDto): Promise<GetUserDto>;
}
