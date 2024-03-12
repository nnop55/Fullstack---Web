import express, { Express, Request, Response, NextFunction } from 'express';
import { AuthRouter } from './routers/auth.router';
import { connectDB } from './services/database.service';
import { CarRouter } from './routers/car.router';
import { ParkingRouter } from './routers/parking.router';

class App {
    private app: Express;

    constructor() {
        this.app = express();

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
        const authRouter = new AuthRouter();
        const carRouter = new CarRouter()
        const parkingRouter = new ParkingRouter()
        this.app.use('/auth', authRouter.getRouter());
        this.app.use('/car', carRouter.getRouter());
        this.app.use('/parking', parkingRouter.getRouter());
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

new App();