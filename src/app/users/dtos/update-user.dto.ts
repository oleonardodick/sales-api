import { ApiProperty } from '@nestjs/swagger';
import { Papel } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Messages } from 'src/utils/messages';

export class UpdateUserDto {
  @ApiProperty()
  @IsString({ message: Messages.errors.notStringValue('nome') })
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsEmail(undefined, { message: Messages.errors.invalidEmail })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'ADMIN or USER' })
  @Transform(({ value }) => value.toString().toUpperCase())
  @IsEnum(Papel, { message: Messages.errors.invalidRole })
  @IsOptional()
  papel?: Papel;
}
