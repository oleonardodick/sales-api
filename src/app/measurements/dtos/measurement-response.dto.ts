import { ApiProperty } from '@nestjs/swagger';
import { Measurement } from '@prisma/client';

export class MeasurementResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(measurement: Measurement) {
    this.id = measurement.id;
    this.code = measurement.code;
    this.name = measurement.name;
    this.createdAt = measurement.createdAt;
    this.updatedAt = measurement.updatedAt;
  }
}
