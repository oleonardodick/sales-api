import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserInteface } from './repositories/interfaces/create-user-repository.interface';
import { CreateUserRepository } from './repositories/implamentations/create-user-repository';
import { CreateUserService } from './services/create-user.service';
import { GetUserController } from './controllers/get-user.controller';
import { GetUserService } from './services/get-user.service';
import { GetUserInterface } from './repositories/interfaces/get-user-repository.interface';
import { GetUserRepository } from './repositories/implamentations/get-user-repository';

@Module({
  controllers: [CreateUserController, GetUserController],
  providers: [
    {
      provide: CreateUserInteface,
      useClass: CreateUserRepository,
    },
    {
      provide: GetUserInterface,
      useClass: GetUserRepository,
    },
    CreateUserService,
    GetUserService,
  ],
})
export class UserModule {}
