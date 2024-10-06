import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name should not be empty',
  })
  @ApiProperty()
  name: string;

  @IsNotEmpty({
    message: 'Email should not be empty',
  })
  @ApiProperty()
  email: string;

  @IsNotEmpty({
    message: 'Password should not be empty',
  })
  @ApiProperty()
  password: string;
}
