import { ParkingService } from "../services/parking.service";
import { Request, Response } from 'express';

export class ParkingController {

    private parkingService: ParkingService

    constructor() {
        this.parkingService = new ParkingService()
    }

    public async getParkingZones(req: Request, res: Response): Promise<void> {
        const result = await this.parkingService.getAllZones()
        res.status(200).json({ data: result });
    }

    public async insertParkingZones(req: Request, res: Response): Promise<void> {
        const { name, address, price } = req.body;
        await this.parkingService.insertZone({ name, address, price })
        res.status(201).json({ name, address, price })
    }
}