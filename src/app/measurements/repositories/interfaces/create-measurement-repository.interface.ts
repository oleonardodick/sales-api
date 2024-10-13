import { Measurement } from '@prisma/client';
import { CreateMeasurementDto } from '../../dtos/create-measurement.dto';

export abstract class CreateMeasurementInterface {
  abstract create(
    measurementCreate: CreateMeasurementDto,
  ): Promise<Measurement>;
}
