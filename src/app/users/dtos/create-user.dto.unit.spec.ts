import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Messages } from 'src/utils/messages';
import { plainToInstance } from 'class-transformer';

describe('CreateUserDto', () => {
  let userData: CreateUserDto;

  beforeEach(() => {
    /*A class-validator precisa de uma instância da classe para realizar as validações
    então existem duas maneiras de fazer isso. A primeira é utilizando a forma
    padrão de criação de instância, ou seja, const userData = new CreateUserDto()
    e depois setar os valores em userData.nomeCampo. A segunda seria utilizando
    a plainToInstance do class-transform.*/
    userData = plainToInstance<CreateUserDto, Partial<CreateUserDto>>(
      CreateUserDto,
      {
        nome: '',
        email: '',
        senha: '',
        cidade: '',
      },
    );
  });

  it('deve validar o campo do nome em branco', async () => {
    userData.email = 'test@mail.com';
    userData.senha = 'password1A';
    userData.cidade = '1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('nome'),
    );
  });

  it('deve validar um valor não string para o campo do nome', async () => {
    userData.nome = 1 as any;
    userData.email = 'test@mail.com';
    userData.senha = 'password1A';
    userData.cidade = '1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('nome'),
    );
  });

  it('deve validar o campo e-mail em branco', async () => {
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.cidade = '1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('e-mail'),
    );
  });

  it('deve validar o e-mail no formato errado', async () => {
    userData.nome = 'Test User';
    userData.email = 'email';
    userData.senha = 'password1A';
    userData.cidade = '1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isEmail).toBe(Messages.errors.invalidEmail);
  });

  it('deve validar senha em branco', async () => {
    userData.nome = 'Test User';
    userData.email = 'teste@mail.com';
    userData.cidade = '1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('senha'),
    );
  });

  it('deve validar senha no formato errado', async () => {
    userData.nome = 'Test User';
    userData.senha = 'password';
    userData.email = 'teste@mail.com';
    userData.cidade = '1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.matches).toBe(
      Messages.errors.invalidPasswordMatch,
    );
  });

  it('deve validar o telefone no formato errado', async () => {
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.email = 'teste@mail.com';
    userData.cidade = '1';
    userData.telefone = 1 as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('telefone'),
    );
  });

  it('deve validar a foto no formato errado', async () => {
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.email = 'teste@mail.com';
    userData.foto = 1 as any;
    userData.cidade = '1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('foto'),
    );
  });

  it('deve validar a rua no formato errado', async () => {
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.email = 'teste@mail.com';
    userData.cidade = '1';
    userData.rua = 1 as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('rua'),
    );
  });

  it('deve validar o número no formato errado', async () => {
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.email = 'teste@mail.com';
    userData.cidade = '1';
    userData.numero = 'invalidNumber' as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isInt).toBe(
      Messages.errors.notIntValue('número'),
    );
  });

  it('deve validar a cidade não informada', async () => {
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.email = 'teste@mail.com';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toBe(
      Messages.errors.fieldRequired('cidade'),
    );
  });

  it('deve validar a cidade no formato errado', async () => {
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.email = 'teste@mail.com';
    userData.cidade = 1 as any;

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toBe(
      Messages.errors.notStringValue('cidade'),
    );
  });

  it('deve validar a data de nascimento no formato errado', async () => {
    userData.nome = 'Test User';
    userData.senha = 'password1A';
    userData.email = 'teste@mail.com';
    userData.dataNascimento = 'invalid Date' as any;
    userData.cidade = '1';

    const errors = await validate(userData);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isDate).toBe(
      Messages.errors.notDateValue('dataNascimento'),
    );
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
    userData.dataNascimento = new Date('2024-11-16');

    const errors = await validate(userData);
    expect(errors).toHaveLength(0);
  });
});
