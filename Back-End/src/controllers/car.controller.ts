import { Request, Response } from 'express';
import CarService from '../services/car.service';


class CarController {

    constructor() { }

    public async addCar(req: Request, res: Response): Promise<void> {
        const { mark, type, licenseNumber } = req.body;
        const userId = (req as any).user['id'];
        await CarService.insertCar({ mark, type, licenseNumber, userId })
        res.status(201).json({ code: 1, mark, type, licenseNumber })
    }

    public async editCar(req: Request, res: Response): Promise<void> {
        const carId = parseInt(req.params.carId)
        const { mark, type, licenseNumber } = req.body
        const user = (req as any).user;
        const car = await CarService.findCarById(carId)

        if (!car) {
            res.status(404).json({ code: 2, error: 'Car not found' });
            return;
        }

        if (user['id'] !== car['user_id']) {
            res.status(400).json({ code: 2, error: 'No permission' });
            return;
        }

        await CarService.updateCarById(
            carId,
            mark ?? car['mark'],
            type ?? car['type'],
            licenseNumber ?? car['license_number']
        )

        res.status(200).json({ code: 1, message: "Success" })
    }

    public async deleteCar(req: Request, res: Response): Promise<void> {
        const { carId } = req.params
        const car = await CarService.findCarById(parseInt(carId))

        if (!car) {
            res.status(404).json({ code: 2, error: 'Car not found' });
            return;
        }

        await CarService.deleteCar(parseInt(carId))
        res.status(202).json({ code: 1, message: "Successfully deleted" })
    }

    public async getCarById(req: Request, res: Response): Promise<void> {
        const { carId } = req.params
        const car = await CarService.findCarById(parseInt(carId))

        if (!car) {
            res.status(404).json({ code: 2, error: 'Car not found' });
            return;
        }

        res.status(202).json({ code: 1, data: car })
    }

    public async getCars(req: Request, res: Response): Promise<void> {
        const result = await CarService.getAllCar()
        res.status(200).json({ code: 1, data: result });
    }
}

export default new CarController();