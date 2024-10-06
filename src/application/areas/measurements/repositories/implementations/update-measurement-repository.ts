import { Injectable } from '@nestjs/common';
import { UpdateMeasurementInterface } from '../interfaces/update-measurement-repository.interface';
import { PrismaService } from 'src/application/database/prisma.service';
import { UpdateMeasurementDto } from '../../dtos/update-measurement.dto';
import { Measurement } from '@prisma/client';

@Injectable()
export class UpdateMeasurementRepository implements UpdateMeasurementInterface {
  constructor(private prisma: PrismaService) {}

  async update(
    id: string,
    measurementUpdate: UpdateMeasurementDto,
  ): Promise<Measurement> {
    return await this.prisma.measurement.update({
      where: {
        id: id,
      },
      data: {
        ...measurementUpdate,
      },
    });
  }
}
