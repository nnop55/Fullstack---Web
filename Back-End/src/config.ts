import { config } from 'dotenv'
import * as path from 'path';

function initializeConfig() {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    const envFile = path.resolve(__dirname, process.env.NODE_ENV === 'production' ? 'prod.env' : 'dev.env');
    config({ path: envFile });
}

initializeConfig();

export const db = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME
};
