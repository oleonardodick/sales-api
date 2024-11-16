import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Messages } from 'src/utils/messages';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: Messages.errors.fieldRequired('nome') })
  @IsString({ message: Messages.errors.notStringValue('nome') })
  nome: string;

  @ApiProperty()
  @IsNotEmpty({ message: Messages.errors.fieldRequired('e-mail') })
  @IsEmail(undefined, { message: Messages.errors.invalidEmail })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: Messages.errors.fieldRequired('senha') })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/, {
    message: Messages.errors.invalidPasswordMatch,
  })
  senha: string;

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
  @IsNotEmpty({ message: Messages.errors.fieldRequired('cidade') })
  @IsString({ message: Messages.errors.notStringValue('cidade') })
  cidade: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: Messages.errors.notStringValue('cep') })
  cep?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: Messages.errors.notDateValue('dataNascimento') })
  dataNascimento?: Date;
}
