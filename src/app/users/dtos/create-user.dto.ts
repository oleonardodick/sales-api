import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The user name is required.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The user e-mail is required.' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The user password is required.' })
  password: string;
}
