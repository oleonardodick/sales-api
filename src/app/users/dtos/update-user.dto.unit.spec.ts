import { validate } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';
import { Messages } from 'src/utils/messages';
import { plainToClass, plainToInstance } from 'class-transformer';

describe('UpdateUserDto', () => {
  let userData: UpdateUserDto;

  beforeEach(() => {
    userData = plainToInstance<UpdateUserDto, Partial<UpdateUserDto>>(
      UpdateUserDto,
      {},
    );
  });

  it('deve validar um valor não string para o campo do nome', async () => {
    userData.nome = 1 as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('nome'),
    );
  });

  it('deve validar o e-mail no formato errado', async () => {
    userData.email = 'email';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isEmail).toBe(Messages.errors.invalidEmail);
  });

  it('deve validar senha no formato errado', async () => {
    userData.senha = 'password';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.matches).toBe(
      Messages.errors.invalidPasswordMatch,
    );
  });

  it('deve validar o telefone no formato errado', async () => {
    userData.telefone = 1 as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('telefone'),
    );
  });

  it('deve validar a foto no formato errado', async () => {
    userData.foto = 1 as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('foto'),
    );
  });

  it('deve validar a rua no formato errado', async () => {
    userData.rua = 1 as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('rua'),
    );
  });

  it('deve validar o número no formato errado', async () => {
    userData.numero = 'invalidNumber' as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isInt).toBe(
      Messages.errors.notIntValue('número'),
    );
  });

  it('deve validar a cidade no formato errado', async () => {
    userData.cidade = 1 as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('cidade'),
    );
  });

  it('deve validar a data de nascimento no formato errado', async () => {
    userData.dataNascimento = 'invalid Date' as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isDate).toBe(
      Messages.errors.notDateValue('dataNascimento'),
    );
  });

  it('deve validar o papel com o valor errado', async () => {
    userData.papel = 'papelErrado' as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isEnum).toBe(Messages.errors.invalidRole);
  });

  it('deve aceitar os valores informados', async () => {
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.email = 'teste@mail.com';
    userData.telefone = '35410210';
    userData.foto = 'caminhoFoto';
    userData.rua = 'teste';
    userData.numero = 10;
    userData.cidade = '1';
    userData.cep = '35440210';
    userData.papel = 'ADMINISTRADOR';
    userData.dataNascimento = new Date('2024-11-16');

    const errors = await validate(userData);
    expect(errors).toHaveLength(0);
  });
});
