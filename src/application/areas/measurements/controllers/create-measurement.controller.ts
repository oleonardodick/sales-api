import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMeasurementService } from '../services/create-measurement.service';
import { CreateMeasurementDto } from '../dtos/create-measurement.dto';
import { MeasurementResponseDto } from '../dtos/measurement-response.dto';
import { ClassValidatorDocumentation } from 'src/common/documentation/class-validator.documentation';

@ApiTags('Products')
@Controller('products/measurements')
export class CreateMeasurementController {
  constructor(private createMeasurementService: CreateMeasurementService) {}

  @ApiOperation({ summary: 'Add a new measurement to the database' })
  @ApiCreatedResponse({
    description: 'The measurement was created.',
    type: MeasurementResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'One or more informations are invalid according to the schema.',
    type: ClassValidatorDocumentation,
  })
  @ApiBody({
    type: CreateMeasurementDto,
    description: 'Data to be used when adding a new measurement.',
  })
  @Post()
  async createMeasurement(
    @Body() measurementCreate: CreateMeasurementDto,
  ): Promise<MeasurementResponseDto> {
    return await this.createMeasurementService.createMeasurement(
      measurementCreate,
    );
  }
}
