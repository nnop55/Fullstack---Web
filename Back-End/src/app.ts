import express, { Express } from 'express';
import { AppHelper } from './services/app-helper';
import { Database } from './data-access/database';


export class App extends AppHelper {
    app: Express = express()
    db: Database = Database.getInstance()


    constructor() {
        super()
        this.setup()

        const sequelize = this.db.getSequelize()
        const PORT = process.env.PORT || 3000;

        if (sequelize) {
            this.app.listen(PORT, () => {
                console.log(`Server is running`);
            });
        } else {
            console.error('Database connection failed. Server not started.');
        }

    }

    async setup() {
        await this.loginUser(this.app)
    }

}

new App();