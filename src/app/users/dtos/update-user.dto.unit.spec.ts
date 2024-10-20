import { validate } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';
import { Messages } from 'src/utils/messages';
import { Role } from '@prisma/client';

describe('UpdateUserDto', () => {
  it('should handle non string value for name', async () => {
    const userData = new UpdateUserDto();
    userData.name = 1 as unknown as string;
    userData.email = 'test@mail.com';
    userData.role = 'USER';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('name'),
    );
  });

  it('should handle validation for wrong e-mail format', async () => {
    const userData = new UpdateUserDto();
    userData.name = 'Test User';
    userData.email = 'email';
    userData.role = 'USER';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isEmail).toBe(Messages.errors.invalidEmail);
  });

  it('should handle validation for invalid role', async () => {
    const userData = new UpdateUserDto();
    userData.name = 'Test User';
    userData.email = 'teste@mail.com';
    userData.role = 'teste' as Role;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isEnum).toBe(Messages.errors.invalidRole);
  });

  it('should accept without passing the name', async () => {
    const userData = new UpdateUserDto();
    userData.email = 'teste@mail.com';
    userData.role = 'ADMIN';

    const errors = await validate(userData);
    expect(errors).toHaveLength(0);
  });

  it('should accept without passing the e-mail', async () => {
    const userData = new UpdateUserDto();
    userData.name = 'Test user';
    userData.role = 'ADMIN';

    const errors = await validate(userData);
    expect(errors).toHaveLength(0);
  });

  it('should accept without passing the rolel', async () => {
    const userData = new UpdateUserDto();
    userData.name = 'Test user';
    userData.email = 'test@mail.com';

    const errors = await validate(userData);
    expect(errors).toHaveLength(0);
  });
});
