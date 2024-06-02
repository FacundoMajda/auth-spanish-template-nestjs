import {
  HttpException,
  Logger,
  ExceptionFilter,
  ArgumentsHost,
  Catch,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger();
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.log(
      `👎 HTTP EXCEPTION - Detalle de Error:\n` +
        `Method: ${request.method} .\n` +
        `URL: ${request.url} .\n` +
        `Status: ${status} .\n` +
        `Error Message: ${exception.message} .\n` +
        `Stack Trace: ${exception.stack} .\n`,
    );

    this.logger.log(
      `Request Details:\n` +
        `Headers: ${JSON.stringify(request.headers, null, 2)} .\n` +
        `Params: ${JSON.stringify(request.params, null, 2)} .\n` +
        `Body: ${JSON.stringify(request.body, null, 2)} .\n`,
    );

    const errorDetails = exception.getResponse();
    response.status(status).json({ error: true, errorDetails });
  }
}
