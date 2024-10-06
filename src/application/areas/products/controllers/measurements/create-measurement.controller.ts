import { Body, Controller, Post } from '@nestjs/common';
import { CreateMeasurementService } from '../../services/measurements/create-measurement.service';
import { CreateMeasurementDto } from '../../dtos/measurements/create-measurement.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products/measurements')
export class CreateMeasurementController {
  constructor(private createMeasurementService: CreateMeasurementService) {}

  @Post()
  async createMeasurement(@Body() measurementCreate: CreateMeasurementDto) {
    await this.createMeasurementService.createMeasurement(measurementCreate);
  }
}
