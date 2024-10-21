import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from 'src/app.module';
import { Messages } from 'src/utils/messages';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { hashData } from 'src/utils/security/hashData.security';

describe('User e2e tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userAuth: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);

    userAuth = await prisma.user.create({
      data: {
        name: 'User Auth',
        password: await hashData('passwordAuth'),
        role: 'ADMIN',
        email: 'userAuth@mail.com',
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication', () => {
    it('should return invalid credentials', async () => {
      const loginData = {
        email: 'userAuth@mail.com',
        password: 'wrongPassword',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.invalidCredentials);
    });

    it('should return user not found', async () => {
      const loginData = {
        email: 'wrongEmail@mail.com',
        password: 'passwordAuth',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginData)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.userNotFound);
    });

    it('should login sucessfully and return the jwt token', async () => {
      const loginData = {
        email: 'userAuth@mail.com',
        password: 'passwordAuth',
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
        'role' in decoded
      ) {
        expect(decoded.email).toEqual(userAuth.email);
        expect(decoded.role).toEqual(userAuth.role);
      } else {
        throw new Error('Invalid payload');
      }
      expect(decoded.sub).toEqual(userAuth.id);
    });
  });
});
