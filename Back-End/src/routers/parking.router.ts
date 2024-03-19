import ParkingController from "../controllers/parking.controller";
import { Router } from "express";
import { verifyToken } from "../middleware/token.middleware";
import { requireRole } from "../middleware/role.middleware";
import { Request, Response } from 'express';
import asyncHandler from "../middleware/async-handler.middleware";
import { checkParkingZone } from "../middleware/parking.middleware";

class ParkingRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                ParkingController.getParkingZones(req, res))
        );
        this.router.post('/add',
            verifyToken,
            requireRole,
            asyncHandler((req: Request, res: Response) =>
                ParkingController.insertParkingZones(req, res))
        );
        this.router.put('/edit/:zoneId',
            verifyToken,
            requireRole,
            asyncHandler((req: Request, res: Response) =>
                ParkingController.editParkingZones(req, res))
        );
        this.router.put('/:carId/occupie/:zoneId',
            verifyToken,
            checkParkingZone,
            asyncHandler((req: Request, res: Response) =>
                ParkingController.occupieParking(req, res))
        );
        this.router.put('/:carId/leave/:zoneId',
            verifyToken,
            checkParkingZone,
            asyncHandler((req: Request, res: Response) =>
                ParkingController.leaveParking(req, res))
        );
    }

    public getRouter(): Router {
        return this.router;
    }

}

export default new ParkingRouter();