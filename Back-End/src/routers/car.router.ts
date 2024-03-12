import { Router } from "express";
import { validateCarInput } from "../middleware/validator.middleware";
import { verifyToken } from "../middleware/token.middleware";
import { CarController } from "../controllers/car.controller";


export class CarRouter {
    private router: Router;
    private carController: CarController

    constructor() {
        this.router = Router();
        this.carController = new CarController()
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/:carId', verifyToken, (req, res) => this.carController.getCarById(req, res));
        this.router.get('/', verifyToken, (req, res) => this.carController.getCars(req, res));
        this.router.post('/add', validateCarInput, verifyToken, (req, res) => this.carController.addCar(req, res));
        this.router.delete('/delete/:carId', verifyToken, (req, res) => this.carController.deleteCar(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }

}