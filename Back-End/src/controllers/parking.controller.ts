import ParkingService from "../services/parking.service";
import { Request, Response } from 'express';
import { ParkingZone } from "../utils/interfaces";

class ParkingController {

    constructor() { }

    public async getParkingZones(req: Request, res: Response): Promise<void> {
        const result = await ParkingService.getAllZones()
        res.status(200).json({ code: 1, data: result });
    }

    public async insertParkingZones(req: Request, res: Response): Promise<void> {
        const { name, address, price } = req.body;
        await ParkingService.insertZone({ name, address, price })
        res.status(201).json({ code: 1, name, address, price })
    }

    public async editParkingZones(req: Request, res: Response): Promise<void> {
        const zoneId = parseInt(req.params.zoneId)
        const { name, address, price } = req.body;
        const zone = await ParkingService.findZoneById(zoneId)

        if (!zone) {
            res.status(404).json({ code: 2, error: 'Zone not found' });
            return;
        }

        await ParkingService.updateZoneById(
            zoneId,
            name ?? zone.name,
            address ?? zone.address,
            price ?? zone.price
        )

        res.status(200).json({ code: 1, name, address, price })
    }

    public async occupieParking(req: Request, res: Response): Promise<void> {
        const carId = parseInt(req.params.carId)
        const zoneId = parseInt(req.params.zoneId)
        const zone = (req as any).zone;

        if (zone.available == ParkingZone.occupied) {
            res.status(400).json({ code: 2, error: 'The parking area is already occupied' });
            return
        }

        await ParkingService.occupie(carId, zoneId)

        res.status(201).json({ code: 1, message: "Success" })
    }

    public async leaveParking(req: Request, res: Response): Promise<void> {
        const zoneId = parseInt(req.params.zoneId)
        const zone = (req as any).zone;

        if (zone.available == ParkingZone.available) {
            res.status(400).json({ code: 2, error: 'The parking area is already available' });
            return
        }

        await ParkingService.leave(zoneId)

        res.status(201).json({ code: 1, message: "Success" })
    }
}

export default new ParkingController()