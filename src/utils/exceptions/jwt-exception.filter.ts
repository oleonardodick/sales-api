import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

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
      ? 'Invalid JWT token'
      : 'Token is required';

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
