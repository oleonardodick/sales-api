import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Messages } from 'src/utils/messages';
import { JwtExceptionFilter } from 'src/utils/exceptions/jwt-exception.filter';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { Usuario } from '@prisma/client';

describe('User e2e tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let accessTokenAdmin: string;
  let admin: Usuario;

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

    admin = await prisma.usuario.create({
      data: {
        nome: 'User Admin Get',
        senha: 'PasswordAdmin',
        papel: 'ADMINISTRADOR',
        email: 'adminGet@mail.com',
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

  describe('Rota /usuarios (get)', () => {
    it('Deve rejeitar pela falta do token JWT', async () => {
      const response = await request(app.getHttpServer())
        .get('/usuarios')
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(
        Messages.errors.fieldRequired('token JWT'),
      );
    });

    it('Deve rejeitar quando enviado um token inválido', async () => {
      const response = await request(app.getHttpServer())
        .get('/usuarios')
        .set('Authorization', `Bearer invalidToken`)
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.invalidToken);
    });

    it('Deve retornar todos os usuários do banco de dados', async () => {
      const response = await request(app.getHttpServer())
        .get('/usuarios')
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(200);

      expect(response.body.length).toBeGreaterThanOrEqual(1);
      expect(response.body[0]).toHaveProperty('id');
    });
  });

  describe('Rota /usuarios/id (get)', () => {
    it('Deve retornar um usuário pelo seu ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/usuarios/${admin.id}`)
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', admin.id);
    });

    it('Deve retornar erro de usuário não encontrado', async () => {
      const response = await request(app.getHttpServer())
        .get('/usuarios/1')
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.userNotFound);
    });
  });

  it('Deve rejeitar quando enviado um token inválido', async () => {
    const response = await request(app.getHttpServer())
      .get(`/usuarios/${admin.id}`)
      .set('Authorization', 'Bearer invalidToken')
      .expect(401);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual(Messages.errors.invalidToken);
  });

  it('Deve rejeitar quando não enviar o token', async () => {
    const response = await request(app.getHttpServer())
      .get(`/usuarios/${admin.id}`)
      .expect(401);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual(
      Messages.errors.fieldRequired('token JWT'),
    );
  });

  describe('Rota /usuarios/query?{queryParams} (get)', () => {
    it('Deve retornar um usuário pelo seu e-mail', async () => {
      const response = await request(app.getHttpServer())
        .get('/usuarios/query')
        .query({ email: admin.email })
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(200);

      expect(response.body).toHaveProperty('email', admin.email);
    });

    it('Deve retornar usuário não encontrado', async () => {
      const response = await request(app.getHttpServer())
        .get('/usuarios/query')
        .query({ email: 'emailNotFound@mail.com' })
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.userNotFound);
    });

    it('Deve recusar por token inválido', async () => {
      const response = await request(app.getHttpServer())
        .get('/usuarios/query')
        .query({ email: admin.email })
        .set('Authorization', 'Bearer invalidToken')
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.invalidToken);
    });

    it('Deve recusar pela falta do token', async () => {
      const response = await request(app.getHttpServer())
        .get('/usuarios/query')
        .query({ email: admin.email })
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(
        Messages.errors.fieldRequired('token JWT'),
      );
    });
  });
});
