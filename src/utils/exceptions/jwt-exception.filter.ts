import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Messages } from '../messages';

@Catch(UnauthorizedException)
export class JwtExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.UNAUTHORIZED;

    const message = request.headers.authorization
      ? Messages.errors.invalidToken
      : Messages.errors.fieldRequired('token JWT');

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
