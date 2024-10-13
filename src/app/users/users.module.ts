import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create-user/create-user.service';
import { UpdateUserService } from './services/update-user/update-user.service';
import { GetUserService } from './services/get-user/get-user.service';
import { GetUserController } from './controllers/get-user/get-user.controller';
import { UpdateUserController } from './controllers/update-user/update-user.controller';
import { CreateUserController } from './controllers/create-user/create-user.controller';

@Module({
  providers: [CreateUserService, UpdateUserService, GetUserService],
  controllers: [GetUserController, UpdateUserController, CreateUserController],
  exports: [GetUserService],
})
export class UsersModule {}
