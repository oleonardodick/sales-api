import { Measurement } from '@prisma/client';

export class GetMeasurementDto {
  id: string;
  code: string;
  name: string;

  constructor(measurement: Measurement) {
    this.id = measurement.id;
    this.code = measurement.code;
    this.name = measurement.name;
  }
}
