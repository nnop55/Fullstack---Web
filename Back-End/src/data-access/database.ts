import mysql from 'mysql'
import { DBParams } from "../interface/interfaces";

export class Database {
    private connection: mysql.Connection | null = null;

    constructor(private dbParams: DBParams) {
    }

    public async connect(): Promise<void> {
        if (!this.connection) {
            try {
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
            } catch (error) {
                console.error('Error connecting to database:', error);
                process.exit(1);
            }
        }
    }

    public setQuery(query: string, params: any[], callback: (error: mysql.MysqlError | null, results?: any) => void) {
        this.connection!.query(query, params, callback);
    }
}

