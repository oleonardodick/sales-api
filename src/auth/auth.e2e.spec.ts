import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from 'src/app.module';
import { Messages } from 'src/utils/messages';
import { PrismaService } from 'src/database/prisma.service';
import { hashData } from 'src/utils/security/hashData.security';
import { Usuario } from '@prisma/client';

describe('User e2e tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userAuth: Usuario;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);

    const estado = await prisma.estado.create({
      data: {
        sigla: 'RS',
        nome: 'Rio Grande do Sul',
      },
    });

    const cidade = await prisma.cidade.create({
      data: {
        ibge: 541021,
        nome: 'Cidade Exemplo',
        estadoId: estado.id,
      },
    });

    userAuth = await prisma.usuario.create({
      data: {
        nome: 'User Auth',
        senha: await hashData('passwordAuth'),
        papel: 'ADMINISTRADOR',
        email: 'userAuth@mail.com',
        cidadeId: cidade.id,
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication', () => {
    it('Deve retornar erro de credenciais inválidas', async () => {
      const loginData = {
        email: 'userAuth@mail.com',
        senha: 'wrongPassword',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.invalidCredentials);
    });

    it('Deve retornar erro de usuário não encontrado', async () => {
      const loginData = {
        email: 'wrongEmail@mail.com',
        senha: 'passwordAuth',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginData)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.userNotFound);
    });

    it('Deve logar com sucesso e retornar o token JWT', async () => {
      const loginData = {
        email: 'userAuth@mail.com',
        senha: 'passwordAuth',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginData)
        .expect(200);

      const token = response.body.access_token;
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

      expect(response.body).toHaveProperty('access_token');
      if (
        typeof decoded === 'object' &&
        decoded !== null &&
        'email' in decoded &&
        'papel' in decoded
      ) {
        expect(decoded.email).toEqual(userAuth.email);
        expect(decoded.papel).toEqual(userAuth.papel);
      } else {
        throw new Error('Invalid payload');
      }
      expect(decoded.sub).toEqual(userAuth.id);
    });
  });
});
