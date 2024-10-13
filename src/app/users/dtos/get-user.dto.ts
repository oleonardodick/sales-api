import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class GetUserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
