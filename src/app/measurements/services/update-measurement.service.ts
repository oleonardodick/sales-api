import { Injectable } from '@nestjs/common';
import { UpdateMeasurementInterface } from '../repositories/interfaces/update-measurement-repository.interface';
import { UpdateMeasurementDto } from '../dtos/update-measurement.dto';
import { MeasurementResponseDto } from '../dtos/measurement-response.dto';
import { GetMeasurementInterface } from '../repositories/interfaces/get-measurement-repository.interface';

@Injectable()
export class UpdateMeasurementService {
  constructor(
    private updateMeasurementInterface: UpdateMeasurementInterface,
    private getMeasurementInterface: GetMeasurementInterface,
  ) {}

  async updateMeasurement(
    id: string,
    measurementUpdate: UpdateMeasurementDto,
  ): Promise<MeasurementResponseDto> {
    /*First, execute a get to see if the measurement exists.
    If not exists the get by id will perform a not found exception.*/
    await this.getMeasurementInterface.getById(id);

    //After update the measurement
    const updatedMeasurement = await this.updateMeasurementInterface.update(
      id,
      measurementUpdate,
    );
    return new MeasurementResponseDto(updatedMeasurement);
  }
}
