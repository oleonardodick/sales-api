import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Messages } from 'src/utils/messages';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: Messages.errors.fieldRequired('name') })
  @IsString({ message: Messages.errors.notStringValue('name') })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: Messages.errors.fieldRequired('e-mail') })
  @IsEmail(undefined, { message: Messages.errors.invalidEmail })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: Messages.errors.fieldRequired('password') })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/, {
    message: Messages.errors.invalidPasswordMatch,
  })
  password: string;

  @ApiProperty({ example: 'ADMIN or USER' })
  @Transform(({ value }) => value.toString().toUpperCase())
  @IsNotEmpty({ message: Messages.errors.fieldRequired('role') })
  @IsEnum(Role, { message: Messages.errors.invalidRole })
  role: Role;
}
