import { Module } from '@nestjs/common';
import { CreateMeasurementController } from './controllers/create-measurement.controller';
import { CreateMeasurementInterface } from './repositories/interfaces/create-measurement-repository.interface';
import { CreateMeasurementRepository } from './repositories/implementations/create-measurement-repository';
import { CreateMeasurementService } from './services/create-measurement.service';
import { GetMeasurementController } from './controllers/get-measurement.controller';
import { GetMeasurementInterface } from './repositories/interfaces/get-measurement-repository.interface';
import { GetMeasurementRepository } from './repositories/implementations/get-measurement-repository';
import { GetMeasurementService } from './services/get-measurement.service';
import { UpdateMeasurementController } from './controllers/update-measurement.controller';
import { UpdateMeasurementInterface } from './repositories/interfaces/update-measurement-repository.interface';
import { UpdateMeasurementRepository } from './repositories/implementations/update-measurement-repository';
import { UpdateMeasurementService } from './services/update-measurement.service';

@Module({
  controllers: [
    CreateMeasurementController,
    GetMeasurementController,
    UpdateMeasurementController,
  ],
  providers: [
    {
      provide: CreateMeasurementInterface,
      useClass: CreateMeasurementRepository,
    },
    {
      provide: GetMeasurementInterface,
      useClass: GetMeasurementRepository,
    },
    {
      provide: UpdateMeasurementInterface,
      useClass: UpdateMeasurementRepository,
    },
    CreateMeasurementService,
    GetMeasurementService,
    UpdateMeasurementService,
  ],
})
export class MeasurementModule {}
