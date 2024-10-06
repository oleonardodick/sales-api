import { GetMeasurementDto } from '../../dtos/measurements/get-measurement.dto';

export abstract class GetMeasurementInterface {
  abstract getAll(): Promise<{ data: GetMeasurementDto[] }>;
  abstract getById(id: string): Promise<GetMeasurementDto>;
  abstract getByCode(code: string): Promise<GetMeasurementDto>;
}
