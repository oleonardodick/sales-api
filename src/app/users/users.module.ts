import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create-user/create-user.service';
import { UpdateUserService } from './services/update-user/update-user.service';
import { GetUserService } from './services/get-user/get-user.service';
import { CreateUserInterface } from './repositories/create-user.interface';
import { CreateUserRepository } from './repositories/implementations/create-user.repository';
import { GetUserInterface } from './repositories/get-user.interface';
import { GetUserRepository } from './repositories/implementations/get-user.repository';
import { UpdateUserInterface } from './repositories/update-user.interface';
import { UpdateUserRepository } from './repositories/implementations/update-user.repository';
import { GetUserController } from './controllers/get-user.controller';
import { UpdateUserController } from './controllers/update-user.controller';
import { CreateUserController } from './controllers/create-user.controller';

@Module({
  providers: [
    CreateUserService,
    {
      provide: CreateUserInterface,
      useClass: CreateUserRepository,
    },
    UpdateUserService,
    {
      provide: UpdateUserInterface,
      useClass: UpdateUserRepository,
    },
    GetUserService,
    {
      provide: GetUserInterface,
      useClass: GetUserRepository,
    },
  ],
  controllers: [GetUserController, UpdateUserController, CreateUserController],
  exports: [GetUserService],
})
export class UsersModule {}
