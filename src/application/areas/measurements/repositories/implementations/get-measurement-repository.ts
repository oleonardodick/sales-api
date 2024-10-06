import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/application/database/prisma.service';
import { GetMeasurementInterface } from '../interfaces/get-measurement-repository.interface';
import { Measurement } from '@prisma/client';
import { GetMeasurementDto } from '../../dtos/get-measurement.dto';

@Injectable()
export class GetMeasurementRepository implements GetMeasurementInterface {
  constructor(private prisma: PrismaService) {}

  private mapMeasurementToDto(measurement: Measurement): GetMeasurementDto {
    return {
      id: measurement.id,
      code: measurement.code,
      name: measurement.name,
    };
  }

  async getAll(): Promise<Measurement[]> {
    const measurements = await this.prisma.measurement.findMany();
    // const measurementsDto = measurements.map((measurement) =>
    //   this.mapMeasurementToDto(measurement),
    // );
    return measurements;
  }

  async getById(id: string): Promise<Measurement> {
    const measurement = await this.prisma.measurement.findUnique({
      where: {
        id: id,
      },
    });

    if (!measurement) {
      throw new NotFoundException(`Measurement not found with the id ${id}`);
    }
    return measurement;

    // return this.mapMeasurementToDto(measurement);
  }

  async getByCode(code: string): Promise<Measurement> {
    const measurement = await this.prisma.measurement.findUnique({
      where: {
        code: code,
      },
    });

    if (!measurement) {
      throw new NotFoundException(
        `Measurement not found with the code ${code}`,
      );
    }
    return measurement;

    // return this.mapMeasurementToDto(measurement);
  }
}
