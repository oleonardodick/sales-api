import { Module } from '@nestjs/common';
import { CreateMeasurementController } from './controllers/measurements/create-measurement.controller';
import { CreateMeasurementInterface } from './repositories/interfaces/create-measurement-repository.interface';
import { CreateMeasurementRepository } from './repositories/implementations/create-measurement-repository';
import { CreateMeasurementService } from './services/measurements/create-measurement.service';
import { GetMeasurementController } from './controllers/measurements/get-measurement.controller';
import { GetMeasurementInterface } from './repositories/interfaces/get-measurement-repository.interface';
import { GetMeasurementRepository } from './repositories/implementations/get-measurement-repository';
import { GetMeasurementService } from './services/measurements/get-measurement.service';

@Module({
  controllers: [CreateMeasurementController, GetMeasurementController],
  providers: [
    {
      provide: CreateMeasurementInterface,
      useClass: CreateMeasurementRepository,
    },
    {
      provide: GetMeasurementInterface,
      useClass: GetMeasurementRepository,
    },
    CreateMeasurementService,
    GetMeasurementService,
  ],
})
export class ProductModule {}
