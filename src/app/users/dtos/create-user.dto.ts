import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The user name is required.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The user e-mail is required.' })
  @IsEmail(undefined, { message: 'E-mail must have an e-mail format.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The user password is required.' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/, {
    message:
      'The password must have at least 8 characters with one lowercase letter, one uppercase letter and one number.',
  })
  password: string;

  @ApiProperty({ example: 'ADMIN or USER' })
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty({ message: 'The role is required.' })
  @IsEnum(Role, { message: 'Role must be either ADMIN or USER' })
  role: Role;
}
