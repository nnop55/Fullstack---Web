import express, { Express } from 'express';
import { connectDB } from './services/database.service';
import { restrictAccess } from './middleware/access.middleware';
import cors from 'cors';

import carRouter from './routers/car.router';
import parkingRouter from './routers/parking.router';
import authRouter from './routers/auth.router';
import historyRouter from './routers/history.router';
import userRouter from './routers/user.router';


const app: Express = express();


app.use(restrictAccess)
app.use(cors());
app.options('*', cors({
    allowedHeaders: ['Content-Type', 'Authorization']
}));

setupMiddleware();
setupRoutes();
setupErrorHandling();

const PORT = process.env.PORT || 3000;
startServer(PORT);


function setupMiddleware() {
    app.use(express.json());
}

function setupRoutes() {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/car', carRouter);
    app.use('/api/parking', parkingRouter);
    app.use('/api/history', historyRouter);
}

function setupErrorHandling() {
    app.all("*", (req, res) => {
        res.status(404).send("Not Found");
    });
}

function startServer(port: number | string) {
    connectDB()
        .then(() => {
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        })
        .catch(err => {
            console.error('Error connecting to database:', err);
            process.exit(1);
        });
}
