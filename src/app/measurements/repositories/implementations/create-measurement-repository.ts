import { Injectable } from '@nestjs/common';
import { CreateMeasurementInterface } from '../interfaces/create-measurement-repository.interface';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMeasurementDto } from '../../dtos/create-measurement.dto';
import { Measurement } from '@prisma/client';

@Injectable()
export class CreateMeasurementRepository implements CreateMeasurementInterface {
  constructor(private prisma: PrismaService) {}

  async create(measurementCreate: CreateMeasurementDto): Promise<Measurement> {
    return await this.prisma.measurement.create({
      data: {
        ...measurementCreate,
      },
    });
  }
}
