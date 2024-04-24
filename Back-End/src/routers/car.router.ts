import { Router } from "express";
import { validationMiddleware } from "../middleware/validator.middleware";
import { verifyToken } from "../middleware/token.middleware";
import asyncHandler from "../middleware/async-handler.middleware";
import CarController from "../controllers/car.controller";
import { CarDto } from "../dtos/car.dto";


const carRouter: Router = Router();

carRouter.get('/:carId',
    verifyToken,
    asyncHandler(CarController.getCarById)
);
carRouter.post('/',
    verifyToken,
    asyncHandler(CarController.getCars)
);
carRouter.get('/models/all',
    verifyToken,
    asyncHandler(CarController.getCarModels)
);
carRouter.post('/add',
    validationMiddleware(CarDto),
    verifyToken,
    asyncHandler(CarController.addCar)
);
carRouter.put('/edit/:carId',
    verifyToken,
    asyncHandler(CarController.editCar)
);
carRouter.delete('/delete/:carId',
    verifyToken,
    asyncHandler(CarController.deleteCar)
);


export default carRouter;