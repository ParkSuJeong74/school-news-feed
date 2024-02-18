import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export interface RequestExceptionResponse {
  status: number;
  code: number;
  message: string | string[];
  desc: string | string[];
  error: { reqId: string; code: string; desc: string[] };
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.toString();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.errorStack = exception.stack;

    return response.status(status).json({
      status: status,
      message: message,
    });
  }
}
