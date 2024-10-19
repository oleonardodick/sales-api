import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'ADMIN or USER' })
  @IsOptional()
  @Transform((role) => role.value.toUpperCase())
  @IsEnum(Role, { message: 'Role must be either ADMIN or USER' })
  role?: Role;
}
