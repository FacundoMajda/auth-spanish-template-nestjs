import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'test',
  entities: [
    // Estructura actual del proyecto
    __dirname + '/../../schematics/**/**/entities/*.entity{.ts,.js}',
    __dirname + '/../../schematics/**/entities/*.entity{.ts,.js}',
  ],
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['dist/migration/*.js']
      : [__dirname + '/../../migration/*{.ts,.js}'],
  logging: true,
  synchronize: true,
  migrationsRun: true,
  // dropSchema: true,
};

export const AppDataSource = new DataSource(DataSourceConfig);
