import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'E-mail is required' })
  email: string;

  @ApiProperty({ example: 'ADMIN or USER' })
  @Transform((role) => role.value.toUpperCase())
  @IsEnum(Role, { message: 'Role must be either ADMIN or USER' })
  role: Role;
}
