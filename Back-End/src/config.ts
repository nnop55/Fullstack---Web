import { config } from 'dotenv'
import * as path from 'path';

function initializeConfig() {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    const envFile = path.resolve(__dirname, process.env.NODE_ENV === 'production' ? 'prod.env' : 'dev.env');
    config({ path: envFile });
}

initializeConfig();

export const dbHost = process.env.DB_HOST;
export const dbPort = process.env.DB_PORT;