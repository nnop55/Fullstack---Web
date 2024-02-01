import { Sequelize } from "sequelize";
import { db } from "../config";



export class Database {
    private static instance: Database;
    private sequelize: Sequelize | null = null;

    private constructor() {
        this.connect();
    }

    public static getInstance(): Database {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    private connect() {
        if (db['name'] && db['username']) {
            this.sequelize = new Sequelize(
                db['name'],
                db['username'],
                db['pass'],
                {
                    host: db['host'],
                    dialect: 'mysql'
                }
            );

            this.sequelize.authenticate()
                .then(() => {
                    console.log('Connection has been established successfully.');
                })
                .catch((error) => {
                    console.error('Unable to connect to the database:', error);
                });
        }
    }

    public getSequelize(): Sequelize | null {
        return this.sequelize;
    }
}

