import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Messages } from '../messages';

/*
  Implementar este filter significa que todas as vezes que disparar um Unauthorized
  o sistema utilizar este tratamento. Como esse filtro foi adicionado globalmente
  no arquivo main, o Unauthorized do login também estava disparando isso.
*/
@Catch(UnauthorizedException)
export class JwtExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Verifica se a URL da requisição é a de login
    if (request.url.startsWith('/auth/login')) {
      // Se for a rota de login, ignora o filtro e deixa o NestJS retornar o comportamento padrão
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: exception.message || 'Unauthorized', // Mensagem padrão do UnauthorizedException
        error: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

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
