import { Request, Response } from 'express';
import { CarRepository } from '../repositories/car.repository';


export class CarController {

    private carRepository: CarRepository

    constructor() {
        this.carRepository = new CarRepository()
    }

    public async addCar(req: Request, res: Response): Promise<void> {
        try {
            const { mark, type, licenseNumber } = req.body;
            await this.carRepository.insertCar({ mark, type, licenseNumber }, (req as any).user['id'])
            res.status(201).json({ mark, type, licenseNumber })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}