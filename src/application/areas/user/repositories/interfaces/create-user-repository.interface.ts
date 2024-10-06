import { UserResponseDto } from '../../dtos/user-response.dto';

export abstract class CreateUserInteface {
  abstract create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserResponseDto>;
}
