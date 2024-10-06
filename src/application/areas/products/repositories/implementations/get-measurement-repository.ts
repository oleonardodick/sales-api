import { Injectable, NotFoundException } from '@nestjs/common';
import { GetMeasurementInterface } from '../interfaces/get-measurement-repository.interface';
import { GetMeasurementDto } from '../../dtos/measurements/get-measurement.dto';
import { PrismaService } from 'src/application/database/prisma.service';
import { Measurement } from '@prisma/client';

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

  async getAll(): Promise<{ data: GetMeasurementDto[] }> {
    const measurements = await this.prisma.measurement.findMany();
    const measurementsDto = measurements.map((measurement) =>
      this.mapMeasurementToDto(measurement),
    );
    return { data: measurementsDto };
  }

  async getById(id: string): Promise<GetMeasurementDto> {
    const measurement = await this.prisma.measurement.findUnique({
      where: {
        id: id,
      },
    });

    if (!measurement) {
      throw new NotFoundException(`Measurement not found with the id ${id}`);
    }

    return this.mapMeasurementToDto(measurement);
  }

  async getByCode(code: string): Promise<GetMeasurementDto> {
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

    return this.mapMeasurementToDto(measurement);
  }
}
