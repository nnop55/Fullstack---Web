import ParkingService from "../services/parking.service";
import { Request, Response } from 'express';
import { ParkingZone } from "../utils/interfaces";
import ServerSidePaging from "../services/ssp.service";
import HistoryService from "../services/history.service";
import CarService from "../services/car.service";

class ParkingController {

    constructor() { }

    public async getParkingZones(req: Request, res: Response): Promise<void> {
        const data = await ParkingService.getAllZones()
        const result = ServerSidePaging.paging(req.body, data)
        res.status(200).json({ code: 1, data: { ...result } })
    }

    public async getParkingZoneById(req: Request, res: Response): Promise<void> {
        const zoneId = parseInt(req.params.zoneId)
        const data = await ParkingService.findZoneById(zoneId)
        res.status(200).json({ code: 1, data })
    }

    public async insertParkingZones(req: Request, res: Response): Promise<void> {
        const { name, address, price } = req.body;
        await ParkingService.insertZone({ name, address, price })
        res.status(201).json({ code: 1, data: { name, address, price } })
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

        res.status(200).json({ code: 1, data: { name, address, price } })
    }

    public async occupieParking(req: Request, res: Response): Promise<void> {
        const car = (req as any).car
        const zone = (req as any).zone;
        const user = (req as any).user;

        if (zone.available == ParkingZone.occupied) {
            res.status(400).json({ code: 2, error: 'The parking area is already occupied' });
            return
        }

        if (car['zone_id']) {
            res.status(400).json({ code: 2, error: 'The car already have occupied zone' });
            return
        }

        await ParkingService.occupie(car['id'], zone['id'])
        await HistoryService.insertItem(car['id'], zone['id'], user['id'])
        await CarService.updateCarZone(car['id'], zone['id'])

        res.status(201).json({ code: 1, message: "Success" })
    }

    public async leaveParking(req: Request, res: Response): Promise<void> {
        const car = (req as any).car
        const zone = (req as any).zone;
        const user = (req as any).user;

        if (zone.available == ParkingZone.available) {
            res.status(400).json({ code: 2, error: 'The parking area is already available' });
            return
        }

        await ParkingService.leave(zone['id'])
        await HistoryService.insertItem(car['id'], zone['id'], user['id'])
        await CarService.updateCarZone(car['id'], null)

        res.status(201).json({ code: 1, message: "Success" })
    }
}

export default new ParkingController()