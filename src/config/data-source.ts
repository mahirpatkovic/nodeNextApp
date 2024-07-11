import { join } from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './Config';

export const AppDataSource: DataSource = new DataSource({
    type: 'mysql',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.db,
    synchronize: true,
    logging: false,
    entities: [join(__dirname, '../entities/**/*.ts')],
    migrations: [],
    subscribers: [],
});
