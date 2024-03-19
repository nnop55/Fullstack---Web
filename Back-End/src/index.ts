import express, { Express } from 'express';
import { connectDB } from './services/database.service';
import { restrictAccess } from './middleware/access.middleware';

import CarRouter from './routers/car.router';
import ParkingRouter from './routers/parking.router';
import AuthRouter from './routers/auth.router';


class Index {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(restrictAccess)

        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();

        const PORT = process.env.PORT || 3200;
        this.startServer(PORT);
    }

    private setupMiddleware() {
        this.app.use(express.json());
    }

    private setupRoutes() {
        this.app.use('/auth', AuthRouter.getRouter());
        this.app.use('/car', CarRouter.getRouter());
        this.app.use('/parking', ParkingRouter.getRouter());
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