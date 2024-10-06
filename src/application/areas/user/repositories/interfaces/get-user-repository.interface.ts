import { UserDetailsDto } from '../../dtos/user-details.dto';

export abstract class GetUserInterface {
  abstract getAll(): Promise<{ users: UserDetailsDto[] }>;
  abstract getById(id: string): Promise<UserDetailsDto>;
}
