import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Messages } from 'src/utils/messages';
import { JwtExceptionFilter } from 'src/utils/exceptions/jwt-exception.filter';
import { PrismaService } from 'src/database/prisma.service';
import { verifyData } from 'src/utils/security/verifyData.security';

describe('User e2e tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new JwtExceptionFilter());
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (post) route', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'User test',
        password: 'superPassword1',
        email: 'test@mail.com',
        role: 'USER',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
    });

    it('should reject the creation of the user', async () => {
      const invalidUser = {
        name: 'User test 2',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('statusCode');
      expect(response.body.message).toContain(
        Messages.errors.fieldRequired('password'),
      );
      expect(response.body.message).toContain(
        Messages.errors.fieldRequired('e-mail'),
      );
      expect(response.body.message).toContain(
        Messages.errors.fieldRequired('role'),
      );
    });

    it('should encrypt the password', async () => {
      const userPasswordEncrypt = {
        name: 'Password encrypt',
        password: 'encryptedPassword123',
        email: 'test@mail.com',
        role: 'USER',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userPasswordEncrypt)
        .expect(201);

      const createdUser = await prisma.user.findUnique({
        where: { id: response.body.id },
      });

      expect(createdUser).toBeDefined();
      expect(createdUser.password).toBeDefined();
      expect(createdUser.password).not.toEqual(userPasswordEncrypt.password);

      const isPasswordMatch = await verifyData(
        userPasswordEncrypt.password,
        createdUser.password,
      );
      expect(isPasswordMatch).toBe(true);
    });
  });
});
