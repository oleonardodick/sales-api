import { Measurement } from '@prisma/client';

export abstract class GetMeasurementInterface {
  abstract getAll(): Promise<Measurement[]>;
  abstract getById(id: string): Promise<Measurement>;
  abstract getByCode(code: string): Promise<Measurement>;
}
