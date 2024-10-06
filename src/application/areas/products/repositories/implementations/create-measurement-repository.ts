import { Injectable } from '@nestjs/common';
import { CreateMeasurementInterface } from '../interfaces/create-measurement-repository.interface';
import { PrismaService } from 'src/application/database/prisma.service';
import { CreateMeasurementDto } from '../../dtos/measurements/create-measurement.dto';

@Injectable()
export class CreateMeasurementRepository implements CreateMeasurementInterface {
  constructor(private prisma: PrismaService) {}

  async create(measurementCreate: CreateMeasurementDto): Promise<void> {
    const { code, name } = measurementCreate;
    await this.prisma.measurement.create({
      data: {
        code,
        name,
      },
    });
  }
}
