import { ApiProperty } from '@nestjs/swagger';

export class NotFoundExceptionDocumentation {
  @ApiProperty({ example: 'Error Message' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}
