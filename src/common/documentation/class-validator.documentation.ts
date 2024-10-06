import { ApiProperty } from '@nestjs/swagger';

export class ClassValidatorDocumentation {
  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;

  @ApiProperty({ default: 400 })
  statusCode: Number;
}
