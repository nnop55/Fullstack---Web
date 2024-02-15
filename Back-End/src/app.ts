import express, { Express } from 'express';
import { Database } from './data-access/database';
import { SessionSecretKey, dbParams } from "./config";
import { DBParams } from './interface/interfaces';
import bodyParser from 'body-parser';
import session from 'express-session';
import { TokenService } from './services/token-service';
import { Auth } from './controllers/auth';

const databaseParams: DBParams = dbParams;

class App {
    private auth: Auth
    private token: TokenService
    private app: Express
    private db: Database

    constructor() {
        this.app = express()
        this.db = new Database(databaseParams)
        this.token = new TokenService()
        this.auth = new Auth(this.token, this.db);

        this.uses()
        this.setupRoutes()

        this.app.all("*", (req, res) => {
            res.status(404).send("Not Found");
        });

        const PORT = process.env.PORT || 3000;

        this.db.connect()
        this.app.listen(PORT, () => {
            console.log(`Server is running`);
        });

    }

    uses() {
        this.app.use(bodyParser.json());
        this.app.use(session({
            secret: SessionSecretKey!,
            resave: false,
            saveUninitialized: false
        }));
    }

    setupRoutes() {
        this.app.use('/auth', this.auth.router);
    }

}

new App();