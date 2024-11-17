import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Messages } from 'src/utils/messages';
import { JwtExceptionFilter } from 'src/utils/exceptions/jwt-exception.filter';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Usuario } from '@prisma/client';

describe('User e2e tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let admin: Usuario;
  let accessTokenAdmin: string;
  let normalUser: Usuario;
  let accessTokenNormalUser: string;

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
        nome: 'User Admin Update',
        senha: 'PasswordAdmin',
        papel: 'ADMINISTRADOR',
        email: 'adminUpdate@mail.com',
        cidadeId: cidade.id,
      },
    });

    normalUser = await prisma.usuario.create({
      data: {
        nome: 'Normal User Update',
        senha: 'PasswordNormal',
        papel: 'USUARIO',
        email: 'userUpdate@mail.com',
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

    const payloadNormalUser = {
      sub: normalUser.id,
      email: normalUser.email,
      papel: normalUser.papel,
    };
    accessTokenNormalUser = await jwtService.signAsync(payloadNormalUser);

    normalUser = await prisma.usuario.findUnique({
      where: { id: normalUser.id },
    });
  });

  describe('Rota /usuarios/id (put)', () => {
    it('Deve rejeitar pela falta do token JWT', async () => {
      const response = await request(app.getHttpServer())
        .put(`/usuarios/${normalUser.id}`)
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(
        Messages.errors.fieldRequired('token JWT'),
      );
    });

    it('Deve rejeitar pelo token inválido', async () => {
      const response = await request(app.getHttpServer())
        .put(`/usuarios/${normalUser.id}`)
        .set('Authorization', `Bearer invalidToken`)
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.invalidToken);
    });

    it('Deve retornar erro quando nenhum id foi passado', async () => {
      await request(app.getHttpServer())
        .put('/usuarios')
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(404);
    });

    it('Deve rejeitar quando um usuário não administrador tenta atualizar um registro', async () => {
      const dataToUpdate: UpdateUserDto = {
        nome: 'User updated',
      };

      const response = await request(app.getHttpServer())
        .put(`/usuarios/${normalUser.id}`)
        .set('Authorization', `Bearer ${accessTokenNormalUser}`)
        .send(dataToUpdate)
        .expect(403);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.forbidenAccess);
    });

    it('Deve atualizar os dados do usuário', async () => {
      const originalUser = normalUser;
      const dataToUpdate: UpdateUserDto = {
        nome: 'User updated',
      };
      await request(app.getHttpServer())
        .put(`/usuarios/${normalUser.id}`)
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .send(dataToUpdate)
        .expect(204);

      const updatedUser = await prisma.usuario.findUnique({
        where: { id: normalUser.id },
      });

      expect(originalUser).not.toEqual(updatedUser);
      expect(originalUser.nome).not.toEqual(updatedUser.nome);
      expect(originalUser.email).toEqual(updatedUser.email);
    });

    it('Deve atualizar a cidade do usuário', async () => {
      const estado = await prisma.estado.create({
        data: {
          sigla: 'TS',
          nome: 'Estado Teste',
        },
      });

      const cidade = await prisma.cidade.create({
        data: {
          ibge: 9054102,
          nome: 'Cidade Exemplo 2',
          estadoId: estado.id,
        },
      });

      const originalUser = normalUser;
      const dataToUpdate: UpdateUserDto = {
        cidade: cidade.id,
      };
      await request(app.getHttpServer())
        .put(`/usuarios/${normalUser.id}`)
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .send(dataToUpdate)
        .expect(204);

      const updatedUser = await prisma.usuario.findUnique({
        where: { id: normalUser.id },
      });

      expect(originalUser).not.toEqual(updatedUser);
      expect(originalUser.cidadeId).not.toEqual(updatedUser.cidadeId);
      expect(originalUser.nome).toEqual(updatedUser.nome);
    });
  });
});
