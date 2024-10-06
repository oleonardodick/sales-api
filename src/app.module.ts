import { Module } from '@nestjs/common';
import { UserModule } from './application/areas/user/user.module';
import { ProductModule } from './application/areas/products/product.module';
import { PrismaModule } from './application/database/prisma.module';
@Module({
  imports: [PrismaModule, UserModule, ProductModule],
})
export class AppModule {}
