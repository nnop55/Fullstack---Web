import { ParkingController } from "../controllers/parking.controller";
import { Router } from "express";
import { verifyToken } from "../middleware/token.middleware";
import { requireRole } from "../middleware/role.middleware";

export class ParkingRouter {
    private router: Router;
    private parkingController: ParkingController

    constructor() {
        this.router = Router();
        this.parkingController = new ParkingController()
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', verifyToken, (req, res) => this.parkingController.getParkingZones(req, res));
        this.router.post('/add', verifyToken, requireRole, (req, res) => this.parkingController.insertParkingZones(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }

}