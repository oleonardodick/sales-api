import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Messages } from 'src/utils/messages';
import { JwtExceptionFilter } from 'src/utils/exceptions/jwt-exception.filter';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';

describe('User e2e tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let accessTokenAdmin: string;
  let admin: User;

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

    admin = await prisma.user.create({
      data: {
        name: 'User Admin Get',
        password: 'PasswordAdmin',
        role: 'ADMIN',
        email: 'adminGet@mail.com',
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
      role: admin.role,
    };
    accessTokenAdmin = await jwtService.signAsync(payloadAdmin);
  });

  describe('/users (get) route', () => {
    it('should reject the query by the lack of JWT Token', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(
        Messages.errors.fieldRequired('token JWT'),
      );
    });

    it('should reject the query when the token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer invalidToken`)
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.invalidToken);
    });

    it('should return all the users from the database', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(200);

      expect(response.body.length).toBeGreaterThanOrEqual(1);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');
    });
  });

  describe('/users/id (get) route', () => {
    it('should return a specific user by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${admin.id}`)
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', admin.id);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });

    it('should return not found when no user was found in the database', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/1')
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.userNotFound);
    });
  });

  it('should refuse the query by invalid token', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${admin.id}`)
      .set('Authorization', 'Bearer invalidToken')
      .expect(401);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual(Messages.errors.invalidToken);
  });

  it('should refuse the query by the lack token', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${admin.id}`)
      .expect(401);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual(
      Messages.errors.fieldRequired('token JWT'),
    );
  });

  describe('/users/query?{queryParams} (get) route', () => {
    it("should return a user by it's e-mail", async () => {
      const response = await request(app.getHttpServer())
        .get('/users/query')
        .query({ email: admin.email })
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(200);

      expect(Object.keys(response.body).length).toBe(3);
      expect(response.body).toHaveProperty('id', admin.id);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return user not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/query')
        .query({ email: 'emailNotFound@mail.com' })
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.userNotFound);
    });

    it('should refuse the query by invalid token', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/query')
        .query({ email: admin.email })
        .set('Authorization', 'Bearer invalidToken')
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.invalidToken);
    });

    it('should refuse the query by the lack token', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/query')
        .query({ email: admin.email })
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(
        Messages.errors.fieldRequired('token JWT'),
      );
    });
  });
});
