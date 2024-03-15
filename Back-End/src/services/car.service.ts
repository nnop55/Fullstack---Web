import { setQuery } from "../services/database.service";
import { Car } from "../utils/interfaces";

export class CarService {

    constructor() { }

    public findCarById(carId: number): Promise<Car | null> {
        return new Promise((resolve, reject) => {
            setQuery(`SELECT * FROM cars WHERE id = ?`,
                [carId], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result.length > 0 ? result[0] : null);
                });
        });
    }

    public insertCar(car: Car, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`INSERT INTO cars (type, mark, license_number, user_id) 
                        VALUES (?, ?, ?, ?)`,
                [car['type'], car['mark'], car['licenseNumber'], userId], (err: any, result: any) => {
                    if (err) {
                        console.error('Error inserting car:', err);
                        reject(err)
                        return;
                    }
                    resolve();
                })

        })
    }

    public deleteCar(carId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`DELETE FROM cars WHERE id = ?`,
                [carId], (err: any, result: any) => {
                    if (err) {
                        console.error('Error deleting car:', err);
                        reject(err)
                        return;
                    }
                    resolve();
                })

        })
    }

    public getAllCar(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery('SELECT * FROM cars', [],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result)
                })
        })
    }
}