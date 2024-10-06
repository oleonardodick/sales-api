import { Injectable } from '@nestjs/common';
import { UpdateMeasurementInterface } from '../repositories/interfaces/update-measurement-repository.interface';
import { UpdateMeasurementDto } from '../dtos/update-measurement.dto';
import { MeasurementResponseDto } from '../dtos/measurement-response.dto';

@Injectable()
export class UpdateMeasurementService {
  constructor(private updateMeasurementInterface: UpdateMeasurementInterface) {}

  async updateMeasurement(
    id: string,
    measurementUpdate: UpdateMeasurementDto,
  ): Promise<MeasurementResponseDto> {
    const updatedMeasurement = await this.updateMeasurementInterface.update(
      id,
      measurementUpdate,
    );
    return new MeasurementResponseDto(updatedMeasurement);
  }
}
