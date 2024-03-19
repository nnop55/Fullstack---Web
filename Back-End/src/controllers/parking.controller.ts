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

    public async editParkingZones(req: Request, res: Response): Promise<void> {
        const zoneId = parseInt(req.params.zoneId)
        const { name, address, price } = req.body;
        const zone = await ParkingService.findZoneById(zoneId)

        if (!zone) {
            res.status(404).json({ error: 'Zone not found' });
            return;
        }

        await ParkingService.updateZoneById(
            zoneId,
            name ?? zone.name,
            address ?? zone.address,
            price ?? zone.price
        )

        res.status(200).json({ name, address, price })
    }
}

export default new ParkingController()