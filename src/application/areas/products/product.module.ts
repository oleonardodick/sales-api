import { Module } from '@nestjs/common';
import { CreateMeasurementController } from './controllers/measurements/create-measurement.controller';
import { CreateMeasurementInterface } from './repositories/interfaces/create-measurement-repository.interface';
import { CreateMeasurementRepository } from './repositories/implementations/create-measurement-repository';
import { CreateMeasurementService } from './services/measurements/create-measurement.service';

@Module({
  controllers: [CreateMeasurementController],
  providers: [
    {
      provide: CreateMeasurementInterface,
      useClass: CreateMeasurementRepository,
    },
    CreateMeasurementService,
  ],
})
export class ProductModule {}
