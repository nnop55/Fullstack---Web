import { NextFunction, Request, Response } from 'express';
import CarService from "../services/car.service"
import ParkingService from '../services/parking.service';

export async function checkParkingZone(req: Request, res: Response, next: NextFunction) {
    const carId = parseInt(req.params.carId)
    const zoneId = parseInt(req.params.zoneId)

    const user = (req as any).user;
    const car = await CarService.findCarById(carId)
    const zone = await ParkingService.findZoneById(zoneId);
    (req as any).zone = zone;

    if (!car) {
        res.status(404).json({ code: 2, error: 'Car not found' });
        return;
    }

    if (!zone) {
        res.status(404).json({ code: 2, error: 'Zone not found' });
        return;
    }

    if (car['user_id'] !== user['id']) {
        res.status(400).json({ code: 2, error: 'Invalid input' });
        return
    }

    next();
}