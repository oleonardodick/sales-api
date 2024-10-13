import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateMeasurementService } from '../services/update-measurement.service';
import { UpdateMeasurementDto } from '../dtos/update-measurement.dto';
import { MeasurementResponseDto } from '../dtos/measurement-response.dto';

@ApiTags('Products')
@Controller('products/measurements')
export class UpdateMeasurementController {
  constructor(private updateMeasurementService: UpdateMeasurementService) {}

  @Put(':id')
  updateMeasurement(
    @Param('id') id: string,
    @Body() measurementUpdate: UpdateMeasurementDto,
  ): Promise<MeasurementResponseDto> {
    return this.updateMeasurementService.updateMeasurement(
      id,
      measurementUpdate,
    );
  }
}
