import { Injectable } from '@nestjs/common';
import { GetMeasurementInterface } from '../repositories/interfaces/get-measurement-repository.interface';
import { GetMeasurementDto } from '../dtos/get-measurement.dto';

@Injectable()
export class GetMeasurementService {
  constructor(private getMeasurementInterface: GetMeasurementInterface) {}

  async getAll(): Promise<GetMeasurementDto[]> {
    const measurements = await this.getMeasurementInterface.getAll();
    return measurements.map(
      (measurement) => new GetMeasurementDto(measurement),
    );
  }

  async getById(id: string): Promise<GetMeasurementDto> {
    const measurement = await this.getMeasurementInterface.getById(id);
    return new GetMeasurementDto(measurement);
  }

  async getByCode(code: string): Promise<GetMeasurementDto> {
    const measurement = await this.getMeasurementInterface.getByCode(code);
    return new GetMeasurementDto(measurement);
  }
}
