import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name should not be empty',
  })
  name: string;

  @IsNotEmpty({
    message: 'Email should not be empty',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password should not be empty',
  })
  password: string;
}
