import { validate } from 'class-validator';
import { Role } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { Messages } from 'src/utils/messages';
import { plainToClass } from 'class-transformer';

describe('CreateUserDto', () => {
  it('should handle validation for empty name', async () => {
    const userData = new CreateUserDto();
    userData.email = 'test@mail.com';
    userData.password = 'password1A';
    userData.role = 'USER';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('name'),
    );
  });

  it('should handle non string value for name', async () => {
    const userData = new CreateUserDto();
    userData.name = 1 as unknown as string;
    userData.email = 'test@mail.com';
    userData.password = 'password1A';
    userData.role = 'USER';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('name'),
    );
  });

  it('should handle validation for empty e-mail', async () => {
    const userData = new CreateUserDto();
    userData.name = 'Test User';
    userData.password = 'password1A';
    userData.role = 'USER';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('e-mail'),
    );
  });

  it('should handle validation for wrong e-mail format', async () => {
    const userData = new CreateUserDto();
    userData.name = 'Test User';
    userData.email = 'email';
    userData.password = 'password1A';
    userData.role = 'USER';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isEmail).toBe(Messages.errors.invalidEmail);
  });

  it('should handle validation for empty password', async () => {
    const userData = new CreateUserDto();
    userData.name = 'Test User';
    userData.email = 'teste@mail.com';
    userData.role = 'USER';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('password'),
    );
  });

  it('should handle validation for password format', async () => {
    const userData = new CreateUserDto();
    userData.name = 'Test User';
    userData.password = 'password';
    userData.email = 'teste@mail.com';
    userData.role = 'USER';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.matches).toBe(
      Messages.errors.invalidPasswordMatch,
    );
  });

  it('should handle validation for empty role', async () => {
    const userData = new CreateUserDto();
    userData.name = 'Test User';
    userData.password = 'password1A';
    userData.email = 'teste@mail.com';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('role'),
    );
  });

  it('should handle validation for invalid role', async () => {
    const userData = new CreateUserDto();
    userData.name = 'Test User';
    userData.password = 'password1A';
    userData.email = 'teste@mail.com';
    userData.role = 'teste' as Role;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isEnum).toBe(Messages.errors.invalidRole);
  });

  it('should accept the the values', async () => {
    const userData: CreateUserDto = {
      name: 'Test User',
      password: 'password1A',
      email: 'teste@mail.com',
      role: 'ADMIN',
    };

    const errors = await validate(userData);
    expect(errors).toHaveLength(0);
  });

  it('should accept the the values even when the role is in lowercase', async () => {
    const userData: CreateUserDto = {
      name: 'Test User',
      password: 'password1A',
      email: 'teste@mail.com',
      role: 'admin' as Role,
    };

    const userDTO = plainToClass(CreateUserDto, userData);

    const errors = await validate(userDTO);
    expect(userDTO.role).toBe('ADMIN');
    expect(errors).toHaveLength(0);
  });
});
