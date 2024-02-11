import mysql from 'mysql'
import { DBParams } from "../interface/interfaces";

export class Database {
    private connection: mysql.Connection | null = null;

    constructor(private dbParams: DBParams) {
    }

    public async connect(): Promise<void> {
        if (!this.connection) {
            this.connection = mysql.createConnection({
                host: this.dbParams.host,
                user: this.dbParams.username,
                password: this.dbParams.pass,
                database: this.dbParams.name
            });

            try {
                await new Promise<void>((resolve, reject) => {
                    this.connection!.connect((err) => {
                        if (err) {
                            console.error('Error connecting to database:', err);
                            reject(err);
                        } else {
                            console.log('Connected to MySQL database');
                            resolve();
                        }
                    });
                });
            } catch (error) {
                throw error;
            }
        }
    }

    public setQuery(query: string, params: any[], callback: (error: mysql.MysqlError | null, results?: any) => void) {
        if (!this.connection) {
            this.connect();
        }

        this.connection!.query(query, params, callback);
    }
}

