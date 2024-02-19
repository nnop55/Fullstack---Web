import express, { Express } from 'express';
import { Database } from './data-access/database';
import { SessionSecretKey, dbParams } from "./config";
import { DBParams } from './utils/interfaces';
import session from 'express-session';
import { TokenMiddleware } from './middleware/token-middleware';
import { AuthRouter, authRouter } from './routers/auth-router';

const databaseParams: DBParams = dbParams;

class App {
    private auth: AuthRouter
    private token: TokenMiddleware
    private app: Express
    private db: Database

    constructor() {
        this.app = express()
        this.db = new Database(databaseParams)
        this.token = new TokenMiddleware()
        this.auth = new AuthRouter(this.token, this.db);

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
        this.app.use(express.json());
        this.app.use(session({
            secret: SessionSecretKey!,
            resave: false,
            saveUninitialized: false
        }));
    }

    setupRoutes() {
        this.app.use('/auth', authRouter);
    }

}

new App();