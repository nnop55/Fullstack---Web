import express, { Express } from 'express';
import { AppHelper } from './services/app-helper';
import { Database } from './data-access/database';
import { dbParams } from "./config";
import { DBParams } from './interface/interfaces';
import bodyParser from 'body-parser';

const databaseParams: DBParams = dbParams;

export class App extends AppHelper {
    app: Express = express()
    db: Database = new Database(databaseParams);


    constructor() {
        super()

        this.app.use(bodyParser.json());

        this.setup()

        const PORT = process.env.PORT || 3000;
        this.db.connect()
            .then(() => {
                console.log('Database connection successful');

                this.app.listen(PORT, () => {
                    console.log(`Server is running`);
                });
            })
            .catch((error) => {
                console.error('Failed to connect to the database:', error);
                process.exit(1);
            });

    }

    async setup() {
        await this.loginUser(this.app, this.db)
        await this.registerUser(this.app, this.db)
        await this.getUsers(this.app, this.db)
    }

}

new App();