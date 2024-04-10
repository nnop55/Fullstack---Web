import express, { Express } from 'express';
import { connectDB } from './services/database.service';
import { restrictAccess } from './middleware/access.middleware';
import cors from 'cors';

import CarRouter from './routers/car.router';
import ParkingRouter from './routers/parking.router';
import AuthRouter from './routers/auth.router';
import HistoryRouter from './routers/history.router';
import UserRouter from './routers/user.router';


class Index {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(restrictAccess)
        this.app.use(cors());
        this.app.options('*', cors({
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();

        const PORT = process.env.PORT || 3000;
        this.startServer(PORT);
    }

    private setupMiddleware() {
        this.app.use(express.json());
    }

    private setupRoutes() {
        this.app.use('/api/auth', AuthRouter.getRouter());
        this.app.use('/api/user', UserRouter.getRouter());
        this.app.use('/api/car', CarRouter.getRouter());
        this.app.use('/api/parking', ParkingRouter.getRouter());
        this.app.use('/api/history', HistoryRouter.getRouter());
    }

    private setupErrorHandling() {
        this.app.all("*", (req, res) => {
            res.status(404).send("Not Found");
        });
    }

    private startServer(port: number | string) {
        connectDB()
            .then(() => {
                this.app.listen(port, () => {
                    console.log(`Server is running on port ${port}`);
                });
            })
            .catch(err => {
                console.error('Error connecting to database:', err);
                process.exit(1);
            });
    }
}

new Index();