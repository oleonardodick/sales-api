import { Measurement } from '@prisma/client';
import { UpdateMeasurementDto } from '../../dtos/update-measurement.dto';

export abstract class UpdateMeasurementInterface {
  abstract update(
    id: string,
    measurementUpdate: UpdateMeasurementDto,
  ): Promise<Measurement>;
}
