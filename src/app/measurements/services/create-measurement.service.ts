import { Injectable } from '@nestjs/common';
import { CreateMeasurementInterface } from '../repositories/interfaces/create-measurement-repository.interface';
import { CreateMeasurementDto } from '../dtos/create-measurement.dto';
import { MeasurementResponseDto } from '../dtos/measurement-response.dto';

@Injectable()
export class CreateMeasurementService {
  constructor(private createMeasurementInterface: CreateMeasurementInterface) {}

  async createMeasurement(
    measurementCreate: CreateMeasurementDto,
  ): Promise<MeasurementResponseDto> {
    const measurementCreated =
      await this.createMeasurementInterface.create(measurementCreate);
    return new MeasurementResponseDto(measurementCreated);
  }
}
