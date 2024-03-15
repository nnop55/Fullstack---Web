import { ParkingService } from "../services/parking.service";
import { Request, Response } from 'express';

export class ParkingController {

    private parkingService: ParkingService

    constructor() {
        this.parkingService = new ParkingService()
    }

    public async getParkingZones(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.parkingService.getAllZones()
            res.status(200).json({ data: result });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}