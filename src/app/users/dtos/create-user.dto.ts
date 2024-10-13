import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

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

  @ApiProperty({ example: 'ADMIN or USER' })
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(Role, { message: 'Role must be either ADMIN or USER' })
  role: Role;
}
