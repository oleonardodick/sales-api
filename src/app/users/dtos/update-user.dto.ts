import { ApiProperty } from '@nestjs/swagger';
import { Papel } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Messages } from 'src/utils/messages';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: Messages.errors.notStringValue('nome') })
  nome?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail(undefined, { message: Messages.errors.invalidEmail })
  email?: string;

  @ApiProperty()
  @IsOptional()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/, {
    message: Messages.errors.invalidPasswordMatch,
  })
  senha?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: Messages.errors.notStringValue('telefone') })
  telefone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: Messages.errors.notStringValue('foto') })
  foto?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: Messages.errors.notStringValue('rua') })
  rua?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt({ message: Messages.errors.notIntValue('número') })
  numero?: number;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: Messages.errors.notStringValue('cidade') })
  cidade?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: Messages.errors.notStringValue('cep') })
  cep?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate({ message: Messages.errors.notDateValue('dataNascimento') })
  dataNascimento?: Date;

  @ApiProperty({ example: 'ADMIN or USER' })
  @Transform(({ value }) => value.toString().toUpperCase())
  @IsEnum(Papel, { message: Messages.errors.invalidRole })
  @IsOptional()
  papel?: Papel;
}
