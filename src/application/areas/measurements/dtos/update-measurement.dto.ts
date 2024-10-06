import { IsUnique } from 'src/common/validators/is-unique.validator';

export class UpdateMeasurementDto {
  @IsUnique('measurement', {
    message: 'Already have a measurement with this code',
  })
  code?: string;
  name?: string;
}
