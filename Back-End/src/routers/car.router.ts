import { Router } from "express";
import { validateCarInput } from "../middleware/validator.middleware";
import { verifyToken } from "../middleware/token.middleware";
import { CarController } from "../controllers/car.controller";
import { Request, Response } from 'express';
import asyncHandler from "../middleware/async-handler.middleware";


export class CarRouter {
    private router: Router;
    private carController: CarController

    constructor() {
        this.router = Router();
        this.carController = new CarController()
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/:carId',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                this.carController.getCarById(req, res))
        );
        this.router.get('/',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                this.carController.getCars(req, res))
        );
        this.router.post('/add',
            validateCarInput,
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                this.carController.addCar(req, res))
        );
        this.router.put('/edit/:carId',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                this.carController.editCar(req, res))
        );
        this.router.delete('/delete/:carId',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                this.carController.deleteCar(req, res))
        );
    }

    public getRouter(): Router {
        return this.router;
    }

}