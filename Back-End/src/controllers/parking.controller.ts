import ParkingService from "../services/parking.service";
import { Request, Response } from 'express';

class ParkingController {

    constructor() { }

    public async getParkingZones(req: Request, res: Response): Promise<void> {
        const result = await ParkingService.getAllZones()
        res.status(200).json({ data: result });
    }

    public async insertParkingZones(req: Request, res: Response): Promise<void> {
        const { name, address, price } = req.body;
        await ParkingService.insertZone({ name, address, price })
        res.status(201).json({ name, address, price })
    }
}

export default new ParkingController()