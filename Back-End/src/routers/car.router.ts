import { Router } from "express";
import { validateCarInput } from "../middleware/validator.middleware";
import { verifyToken } from "../middleware/token.middleware";
import { Request, Response } from 'express';
import asyncHandler from "../middleware/async-handler.middleware";
import CarController from "../controllers/car.controller";


class CarRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/:carId',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                CarController.getCarById(req, res))
        );
        this.router.get('/',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                CarController.getCars(req, res))
        );
        this.router.post('/add',
            validateCarInput,
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                CarController.addCar(req, res))
        );
        this.router.put('/edit/:carId',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                CarController.editCar(req, res))
        );
        this.router.delete('/delete/:carId',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                CarController.deleteCar(req, res))
        );
    }

    public getRouter(): Router {
        return this.router;
    }

}

export default new CarRouter();