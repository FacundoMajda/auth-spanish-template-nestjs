import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS: CorsOptions = {
  origin: process.env.CORS_ORIGIN || true,
  methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: process.env.CORS_CREDENTIALS
    ? process.env.CORS_CREDENTIALS === 'true'
    : true,
};
