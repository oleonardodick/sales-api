import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMeasurementService } from '../services/create-measurement.service';
import { CreateMeasurementDto } from '../dtos/create-measurement.dto';
import { MeasurementResponseDto } from '../dtos/measurement-response.dto';

@ApiTags('Products')
@Controller('products/measurements')
export class CreateMeasurementController {
  constructor(private createMeasurementService: CreateMeasurementService) {}

  @Post()
  async createMeasurement(
    @Body() measurementCreate: CreateMeasurementDto,
  ): Promise<MeasurementResponseDto> {
    return await this.createMeasurementService.createMeasurement(
      measurementCreate,
    );
  }
}
