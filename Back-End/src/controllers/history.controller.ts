import { Request, Response } from 'express';
import HistoryService from '../services/history.service';
import ServerSidePaging from "../services/ssp.service";

class HistoryController {

    constructor() { }

    public async getHistory(req: Request, res: Response) {
        const data = await HistoryService.getHistories()
        const result = ServerSidePaging.paging(req.body, data)
        res.status(200).json({ code: 1, data: { ...result } });
    }

    // public async insertOrUpdateItem(req: Request, res: Response): Promise<void> {
    //     const { carId, zoneId } = req.body;
    //     await HistoryService.insertOrUpdateItem(carId, zoneId)
    //     res.status(201).json({ code: 1, data: { carId, zoneId } })
    // }
}

export default new HistoryController()