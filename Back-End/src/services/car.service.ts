import { setQuery } from "../services/database.service";
import { Car, CarRes } from "../utils/interfaces";

class CarService {

    constructor() { }

    public findCarById(carId: number): Promise<CarRes | null> {
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

    public insertCar(car: Car): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`INSERT INTO cars (type, mark, license_number, user_id) 
                        VALUES (?, ?, ?, ?)`,
                [car['type'], car['mark'], car['licenseNumber'], car['userId']], (err: any, result: any) => {
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

    public updateCarById(id: number, mark: string, type: string, licenseNumber: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setQuery(`UPDATE cars SET 
                    mark = ?, type = ?, 
                    license_number = ? 
                    WHERE id = ?`,
                [mark, type, licenseNumber, id], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
        });
    }
}

export default new CarService();