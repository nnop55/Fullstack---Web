import ParkingController from "../controllers/parking.controller";
import { Router } from "express";
import { verifyToken } from "../middleware/token.middleware";
import { requireRole } from "../middleware/role.middleware";
import asyncHandler from "../middleware/async-handler.middleware";
import { checkParkingZone } from "../middleware/parking.middleware";


const parkingRouter: Router = Router()

parkingRouter.post('/',
    verifyToken,
    asyncHandler(ParkingController.getParkingZones)
);
parkingRouter.get('/:zoneId',
    verifyToken,
    asyncHandler(ParkingController.getParkingZoneById)
);
parkingRouter.post('/add',
    verifyToken,
    requireRole,
    asyncHandler(ParkingController.insertParkingZones)
);
parkingRouter.put('/edit/:zoneId',
    verifyToken,
    requireRole,
    asyncHandler(ParkingController.editParkingZones)
);
parkingRouter.put('/:carId/occupie/:zoneId',
    verifyToken,
    checkParkingZone,
    asyncHandler(ParkingController.occupieParking)
);
parkingRouter.put('/:carId/leave/:zoneId',
    verifyToken,
    checkParkingZone,
    asyncHandler(ParkingController.leaveParking)
);


export default parkingRouter;