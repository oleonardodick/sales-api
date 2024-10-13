import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsUnique } from 'src/utils/validators/is-unique.validator';

export class CreateMeasurementDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "'Code' is a required information.",
  })
  @IsUnique('measurement', {
    message: 'Already have a measurement with this code.',
  })
  code: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "'Name' is a required information.",
  })
  name: string;
}
