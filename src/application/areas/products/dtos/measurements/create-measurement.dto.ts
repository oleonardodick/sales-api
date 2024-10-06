import { IsNotEmpty, Validate } from 'class-validator';
import { IsUnique } from 'src/common/validators/is-unique.validator';

export class CreateMeasurementDto {
  @IsNotEmpty({
    message: 'Code should not be empty',
  })
  @IsUnique('measurement', 'code', {
    message: 'Already have a measurement with this code',
  })
  code: string;

  @IsNotEmpty({
    message: 'Name should not be empty',
  })
  name: string;
}
