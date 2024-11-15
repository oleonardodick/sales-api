import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Messages } from 'src/utils/messages';

describe('CreateUserDto', () => {
  it('deve validar o campo do nome em branco', async () => {
    const userData = new CreateUserDto();
    userData.email = 'test@mail.com';
    userData.senha = 'password1A';
    userData.endereco = 'end1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('nome'),
    );
  });

  it('deve validar um valor não string para o campo do nome', async () => {
    const userData = new CreateUserDto();
    userData.nome = 1 as any;
    userData.email = 'test@mail.com';
    userData.senha = 'password1A';
    userData.endereco = 'end1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('nome'),
    );
  });

  it('deve validar o campo e-mail em branco', async () => {
    const userData = new CreateUserDto();
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.endereco = 'end1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('e-mail'),
    );
  });

  it('deve validar o e-mail no formato errado', async () => {
    const userData = new CreateUserDto();
    userData.nome = 'Test User';
    userData.email = 'email';
    userData.senha = 'password1A';
    userData.endereco = 'end1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isEmail).toBe(Messages.errors.invalidEmail);
  });

  it('deve validar senha em branco', async () => {
    const userData = new CreateUserDto();
    userData.nome = 'Test User';
    userData.email = 'teste@mail.com';
    userData.endereco = 'end1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('senha'),
    );
  });

  it('deve validar senha no formato errado', async () => {
    const userData = new CreateUserDto();
    userData.nome = 'Test User';
    userData.senha = 'password';
    userData.email = 'teste@mail.com';
    userData.endereco = 'end1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.matches).toBe(
      Messages.errors.invalidPasswordMatch,
    );
  });

  // it('deve validar o telefone no formato errado', async () => {
  //   const userData: CreateUserDto = {
  //     nome: 'Test User',
  //     senha: 'password1A',
  //     email: 'teste@mail.com',
  //     telefone: 1 as any,
  //     endereco: 'end1',
  //   };

  //   const errors = await validate(userData);
  //   expect(errors).toHaveLength(1);
  //   expect(errors[0].constraints.isString).toBe(
  //     Messages.errors.notStringValue('telefone'),
  //   );
  // });

  // it('deve validar o avatar no formato errado', async () => {
  //   const userData: CreateUserDto = {
  //     nome: 'Test User',
  //     senha: 'password1A',
  //     email: 'teste@mail.com',
  //     avatarUrl: 1 as unknown as string,
  //     endereco: 'end1',
  //   };

  //   const errors = await validate(userData);
  //   expect(errors).toHaveLength(1);
  //   expect(errors[0].constraints.isString).toBe(
  //     Messages.errors.notStringValue('avatarUrl'),
  //   );
  // });

  // it('deve validar a data de nascimento no formato errado', async () => {
  //   const userData: CreateUserDto = {
  //     nome: 'Test User',
  //     senha: 'password1A',
  //     email: 'teste@mail.com',
  //     dataNascimento: 'invalid Date' as any,
  //     endereco: 'end1',
  //   };

  //   const errors = await validate(userData);
  //   expect(errors).toHaveLength(1);
  //   expect(errors[0].constraints.isDate).toBe(
  //     Messages.errors.notStringValue('dataNascimento'),
  //   );
  // });

  it('deve validar o endereço em branco', async () => {
    const userData = new CreateUserDto();
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.email = 'teste@mail.com';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('endereço'),
    );
  });

  it('deve validar o endereço no formato errado', async () => {
    const userData = new CreateUserDto();
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.email = 'teste@mail.com';
    userData.endereco = 1 as unknown as string;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('endereço'),
    );
  });

  it('deve aceitar os valores informados', async () => {
    const userData: CreateUserDto = {
      nome: 'Test User',
      senha: 'password1A',
      email: 'teste@mail.com',
      endereco: 'end1',
    };

    const errors = await validate(userData);
    expect(errors).toHaveLength(0);
  });
});
