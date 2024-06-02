import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Logging');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip, hostname } = req;
    const reqTime = Date.now();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const responseTime = Date.now() - reqTime;

      const body = JSON.parse(JSON.stringify(req.body));
      delete body.signature;
      delete body.polygon;
      delete body.base64;
      delete body.web_image;
      delete body.mobile_image;
      delete body.image;
      delete body.file;
      delete body.attachments;
      delete body.attachment;

      this.logger.log(
        `👍 LOGGING MIDDLEWARE - Detalles de la solicitud:\n` +
          `IP: ${ip} .\n` +
          `Hostname: ${hostname} .\n` +
          `Method: ${method} .\n` +
          `URL: ${originalUrl} .\n` +
          `Body: ${JSON.stringify(body, null, 2)} .\n` +
          `Response: \n` +
          `  StatusCode: ${statusCode} .\n` +
          `  StatusMessage: ${statusMessage} .\n` +
          `  ResponseTime: ${responseTime}ms .\n`,
      );
    });

    next();
  }
}
