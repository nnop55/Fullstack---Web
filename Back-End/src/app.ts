import express, { Express, Request, Response, NextFunction } from 'express';
import { Database } from './data-access/database';
import { SessionSecretKey, dbParams } from "./config";
import session from 'express-session';
import { AuthRouter } from './routers/auth-router';

class App {
    private app: Express;
    private db: Database;

    constructor() {
        this.app = express();
        this.db = new Database(dbParams);

        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();

        const PORT = process.env.PORT || 3000;
        this.startServer(PORT);
    }

    private setupMiddleware() {
        this.app.use(express.json());
        this.app.use(session({
            secret: SessionSecretKey!,
            resave: false,
            saveUninitialized: false
        }));
    }

    private setupRoutes() {
        const authRouter = new AuthRouter(this.db);
        this.app.use('/auth', authRouter.getRouter());
    }

    private setupErrorHandling() {
        this.app.all("*", (req, res) => {
            res.status(404).send("Not Found");
        });

        this.app.use((
            err: Error, req: Request,
            res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Internal Server Error');
        });
    }

    private startServer(port: number | string) {
        this.db.connect()
            .then(() => {
                this.app.listen(port, () => {
                    console.log(`Server is running on port ${port}`);
                });
            })
            .catch(err => {
                console.error('Error connecting to database:', err);
            });
    }
}

new App();