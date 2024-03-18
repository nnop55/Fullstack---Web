import mysql from 'mysql'
import { dbParams } from '../config';

let connection: mysql.Connection | null = null;


export async function connectDB(): Promise<void> {
    if (!connection) {
        connection = mysql.createConnection({
            host: dbParams.host,
            user: dbParams.username,
            password: dbParams.pass,
            database: dbParams.database
        });


        await new Promise<void>((resolve, reject) => {
            connection!.connect((err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve();
                console.log('Database connection successful');
            });
        });

    }
}

export function setQuery(
    query: string,
    params: any[],
    callback: (error: mysql.MysqlError | null, results?: any) => void) {
    connection!.query(query, params, callback);
}


