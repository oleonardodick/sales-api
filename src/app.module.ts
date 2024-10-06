import { Module } from '@nestjs/common';
import { UserModule } from './application/areas/user/user.module';
import { ProductModule } from './application/areas/products/product.module';
import { PrismaModule } from './application/database/prisma.module';
import { MeasurementModule } from './application/areas/measurements/measurement.module';
@Module({
  imports: [PrismaModule, UserModule, ProductModule, MeasurementModule],
})
export class AppModule {}
