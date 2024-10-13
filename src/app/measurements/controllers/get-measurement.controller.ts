import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetMeasurementService } from '../services/get-measurement.service';
import { GetMeasurementDto } from '../dtos/get-measurement.dto';

@ApiTags('Products')
@Controller('products/measurements')
export class GetMeasurementController {
  constructor(private getMeasurementService: GetMeasurementService) {}

  @Get()
  async getAll(): Promise<{ data: GetMeasurementDto[] }> {
    return { data: await this.getMeasurementService.getAll() };
  }

  @Get('query')
  getByCode(@Query('code') code: string): Promise<GetMeasurementDto> {
    return this.getMeasurementService.getByCode(code);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<GetMeasurementDto> {
    return this.getMeasurementService.getById(id);
  }
}
