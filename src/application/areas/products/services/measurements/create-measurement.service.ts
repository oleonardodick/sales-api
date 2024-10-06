import { Injectable } from '@nestjs/common';
import { CreateMeasurementInterface } from '../../repositories/interfaces/create-measurement-repository.interface';
import { CreateMeasurementDto } from '../../dtos/measurements/create-measurement.dto';

@Injectable()
export class CreateMeasurementService {
  constructor(private createMeasurementInterface: CreateMeasurementInterface) {}

  createMeasurement(measurementCreate: CreateMeasurementDto) {
    this.createMeasurementInterface.create(measurementCreate);
  }
}
