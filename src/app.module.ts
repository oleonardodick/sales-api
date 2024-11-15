import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
})
export class AppModule {}
