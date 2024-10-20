import { validate } from 'class-validator';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { Role } from '@prisma/client';

describe('CreateUserDto', () => {
  it('should handle validation for empty name', async () => {
    const userData = new CreateUserDto();
    userData.email = 'test@mail.com';
    userData.password = 'password1A';
    userData.role = 'USER';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe('The user name is required.');
  });

  it('should handle validation for empty e-mail', async () => {
    const userData = new CreateUserDto();
    userData.name = 'Test User';
    userData.password = 'password1A';
    userData.role = 'USER';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      'The user e-mail is required.',
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
    expect(errors[0].constraints.isEmail).toBe(
      'E-mail must have an e-mail format.',
    );
  });

  it('should handle validation for empty password', async () => {
    const userData = new CreateUserDto();
    userData.name = 'Test User';
    userData.email = 'teste@mail.com';
    userData.role = 'USER';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      'The user password is required.',
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
      'The password must have at least 8 characters with one lowercase letter, one uppercase letter and one number.',
    );
  });

  it('should handle validation for empty role', async () => {
    const userData = new CreateUserDto();
    userData.name = 'Test User';
    userData.password = 'password1A';
    userData.email = 'teste@mail.com';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe('The role is required.');
  });

  it('should handle validation for invalid role', async () => {
    const userData = new CreateUserDto();
    userData.name = 'Test User';
    userData.password = 'password1A';
    userData.email = 'teste@mail.com';
    userData.role = 'teste' as Role;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isEnum).toBe(
      'Role must be either ADMIN or USER',
    );
  });
});
