import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMeasurementDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "'Code' is a required information.",
  })
  code: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "'Name' is a required information.",
  })
  name: string;
}
