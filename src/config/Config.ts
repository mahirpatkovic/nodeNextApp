import * as dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
    env: string;
    port: string;
    dbHost: string;
    db: string;
    dbPort: number;
    dbUsername: string;
    dbPassword: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    jwtCookieExpiresIn: number;
}

export const config: AppConfig = {
    env: process.env.NODE_ENV || 'local',
    port: process.env.PORT || '8800',
    dbHost: process.env.DB_HOST || 'localhost',
    db: process.env.DB || 'blogManagement',
    dbPort: parseInt(process.env.DB_PORT) || 3306,
    dbUsername: process.env.DB_USERNAME || 'root',
    dbPassword: process.env.DB_PASSWORD || 'test1234',
    jwtSecret: process.env.JWT_SECRET || '',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '',
    jwtCookieExpiresIn: Number(process.env.JWT_COOKIE_EXPIRES_IN) || 1,
};
