import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Messages } from 'src/utils/messages';
import { JwtExceptionFilter } from 'src/utils/exceptions/jwt-exception.filter';
import { PrismaService } from 'src/database/prisma.service';
import { verifyData } from 'src/utils/security/verifyData.security';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Cidade, Estado, Usuario } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

describe('User e2e tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let cidade: Cidade;
  let estado: Estado;
  let admin: Usuario;
  let accessTokenAdmin: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new JwtExceptionFilter());
    await app.init();

    jwtService = app.get<JwtService>(JwtService);
    prisma = app.get<PrismaService>(PrismaService);

    estado = await prisma.estado.create({
      data: {
        sigla: 'RS',
        nome: 'Rio Grande do Sul',
      },
    });

    cidade = await prisma.cidade.create({
      data: {
        ibge: 541021,
        nome: 'Cidade Exemplo',
        estadoId: estado.id,
      },
    });

    admin = await prisma.usuario.create({
      data: {
        nome: 'Admin',
        email: 'admin@mail.com',
        senha: 'adminSenha1',
        papel: 'ADMINISTRADOR',
        cidadeId: cidade.id,
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const payloadAdmin = {
      sub: admin.id,
      email: admin.email,
      papel: admin.papel,
    };
    accessTokenAdmin = await jwtService.signAsync(payloadAdmin);
  });

  describe('rota /usuarios (post)', () => {
    it('Deve criar um novo usuário', async () => {
      const novoUsuario: CreateUserDto = {
        nome: 'User test',
        senha: 'superPassword1',
        email: 'test@mail.com',
        cidade: cidade.id,
      };

      const response = await request(app.getHttpServer())
        .post('/usuarios')
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .send(novoUsuario)
        .expect(201);

      console.log(response.body);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe(novoUsuario.nome);
      expect(response.body.email).toBe(novoUsuario.email);
    });

    it('Deve rejeitar a criação do usuário por falta de dados', async () => {
      const invalidUser = {
        nome: 'User test 2',
      };

      const response = await request(app.getHttpServer())
        .post('/usuarios')
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .send(invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('statusCode');
      expect(response.body.message).toContain(
        Messages.errors.fieldRequired('senha'),
      );
      expect(response.body.message).toContain(
        Messages.errors.fieldRequired('e-mail'),
      );
      expect(response.body.message).toContain(
        Messages.errors.fieldRequired('cidade'),
      );
    });

    it('Deve encriptar a senha enviada', async () => {
      const userPasswordEncrypt = {
        nome: 'Password encrypt',
        senha: 'encryptedPassword123',
        email: 'test@mail.com',
        cidade: cidade.id,
      };

      const response = await request(app.getHttpServer())
        .post('/usuarios')
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .send(userPasswordEncrypt)
        .expect(201);

      const createdUser = await prisma.usuario.findUnique({
        where: { id: response.body.id },
      });

      expect(createdUser).toBeDefined();
      expect(createdUser.senha).toBeDefined();
      expect(createdUser.senha).not.toEqual(userPasswordEncrypt.senha);

      const isPasswordMatch = await verifyData(
        userPasswordEncrypt.senha,
        createdUser.senha,
      );
      expect(isPasswordMatch).toBe(true);
    });
  });
});
