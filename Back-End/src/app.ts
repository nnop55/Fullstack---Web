import express from 'express';
import { AppHelper } from './services/app-helper';
import { Database } from './data-access/database';
import { SessionSecretKey, dbParams } from "./config";
import { DBParams } from './interface/interfaces';
import bodyParser from 'body-parser';
import session from 'express-session';

const databaseParams: DBParams = dbParams;

class App extends AppHelper {
    constructor() {
        const appInstance = express()
        const dbInstance = new Database(databaseParams);
        super(appInstance, dbInstance)
        this.app = appInstance
        this.db = dbInstance

        this.app.use(bodyParser.json(), session({
            secret: SessionSecretKey!,
            resave: false,
            saveUninitialized: false
        }));
        this.setupRoutes()

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

    async setupRoutes() {
        await this.loginUser()
        await this.registerUser()
        await this.getUsers()
        await this.logoutUser()
    }

}

new App();