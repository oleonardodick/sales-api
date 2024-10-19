import { UpdateUserDto } from '../dtos/update-user.dto';

export abstract class UpdateUserInterface {
  abstract updateUser(id: string, userData: UpdateUserDto): Promise<void>;
}
