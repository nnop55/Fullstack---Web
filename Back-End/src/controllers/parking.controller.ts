import { ParkingRepository } from "../repositories/parking.repository";
import { Request, Response } from 'express';

export class ParkingController {

    private parkingRepository: ParkingRepository

    constructor() {
        this.parkingRepository = new ParkingRepository()
    }

    public async getParkingZones(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.parkingRepository.getAllZones()
            res.status(200).json({ data: result });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}