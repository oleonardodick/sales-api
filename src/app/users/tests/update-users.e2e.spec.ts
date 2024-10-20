import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Messages } from 'src/utils/messages';
import { JwtExceptionFilter } from 'src/utils/exceptions/jwt-exception.filter';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from '../dtos/update-user.dto';

describe('User e2e tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let admin: User;
  let accessTokenAdmin: string;
  let normalUser: User;
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

    admin = await prisma.user.create({
      data: {
        name: 'User Admin Update',
        password: 'PasswordAdmin',
        role: 'ADMIN',
        email: 'adminUpdate@mail.com',
      },
    });

    normalUser = await prisma.user.create({
      data: {
        name: 'Normal User Update',
        password: 'PasswordNormal',
        role: 'USER',
        email: 'userUpdate@mail.com',
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

    const payloadNormalUser = {
      sub: normalUser.id,
      email: normalUser.email,
      role: normalUser.role,
    };
    accessTokenNormalUser = await jwtService.signAsync(payloadNormalUser);
  });

  describe('/users/id (put) route', () => {
    it('should reject the update by the lack of JWT Token', async () => {
      const response = await request(app.getHttpServer())
        .put(`/users/${normalUser.id}`)
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(
        Messages.errors.fieldRequired('token JWT'),
      );
    });

    it('should reject the update when the token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .put(`/users/${normalUser.id}`)
        .set('Authorization', `Bearer invalidToken`)
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.invalidToken);
    });

    it('should return error when no ID was passed', async () => {
      await request(app.getHttpServer())
        .put('/users')
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .expect(404);
    });

    it('should reject when a user that is not an admin try to update a user', async () => {
      const dataToUpdate: UpdateUserDto = {
        name: 'User updated',
      };

      const response = await request(app.getHttpServer())
        .put(`/users/${normalUser.id}`)
        .set('Authorization', `Bearer ${accessTokenNormalUser}`)
        .send(dataToUpdate)
        .expect(403);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual(Messages.errors.forbidenAccess);
    });

    it('should update the user data', async () => {
      const originalUser = normalUser;
      const dataToUpdate: UpdateUserDto = {
        name: 'User updated',
        role: 'ADMIN',
      };
      await request(app.getHttpServer())
        .put(`/users/${normalUser.id}`)
        .set('Authorization', `Bearer ${accessTokenAdmin}`)
        .send(dataToUpdate)
        .expect(204);

      const updatedUser = await prisma.user.findUnique({
        where: { id: normalUser.id },
      });

      expect(originalUser).not.toEqual(updatedUser);
      expect(originalUser.name).not.toEqual(updatedUser.name);
      expect(originalUser.email).toEqual(updatedUser.email);
    });
  });
});
