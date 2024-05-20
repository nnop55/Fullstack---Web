import CarController from '../controllers/car.controller';
import CarService from '../services/car.service';
import ServerSidePaging from '../services/ssp.service';
import { Request, Response } from 'express';
import { CarMakes, CarModels, CarTypes } from '../utils/car-enum';

jest.mock('../services/car.service');
jest.mock('../services/ssp.service');

describe('CarController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addCar', () => {
        it('should return 201 and data', async () => {
            const car = { mark: 'BMW', model: '5 Series', type: 'Sedan', licenseNumber: "TEST" };

            req.body = { ...car };
            (req as any).user = { id: 1 };
            (CarService.insertCar as jest.Mock).mockResolvedValue(true);


            await CarController.addCar(req as Request, res as Response);

            expect(CarService.insertCar).toHaveBeenCalledWith(
                ({ ...car, userId: 1 })
            )
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ code: 1, data: car });
        });
    })
});

