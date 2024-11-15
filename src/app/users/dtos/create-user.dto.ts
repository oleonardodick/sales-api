import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
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
  @IsString({ message: Messages.errors.notStringValue('avatarUrl') })
  avatarUrl?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate({ message: Messages.errors.notDateValues('dataNascimento') })
  dataNascimento?: Date;

  @IsNotEmpty({ message: Messages.errors.fieldRequired('endereço') })
  @IsString({ message: Messages.errors.notStringValue('endereço') })
  @IsNotEmpty({ message: Messages.errors.fieldRequired('endereço') })
  endereco: string;
}
