import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetMeasurementService } from '../../services/measurements/get-measurement.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products/measurements')
export class GetMeasurementController {
  constructor(private getMeasurementService: GetMeasurementService) {}

  @Get()
  getAll() {
    return this.getMeasurementService.getAll();
  }

  @Get('query')
  getByCode(@Query('code') code: string) {
    return this.getMeasurementService.getByCode(code);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.getMeasurementService.getById(id);
  }
}
