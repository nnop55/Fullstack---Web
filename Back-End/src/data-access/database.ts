import mysql from 'mysql'
import { DBParams } from "../utils/interfaces";

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
                database: this.dbParams.database
            });


            await new Promise<void>((resolve, reject) => {
                this.connection!.connect((err) => {
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

    public setQuery(query: string, params: any[], callback: (error: mysql.MysqlError | null, results?: any) => void) {
        this.connection!.query(query, params, callback);
    }
}

