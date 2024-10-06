import { CreateMeasurementDto } from '../../dtos/measurements/create-measurement.dto';

export abstract class CreateMeasurementInterface {
  abstract create(measurementCreate: CreateMeasurementDto): Promise<void>;
}
