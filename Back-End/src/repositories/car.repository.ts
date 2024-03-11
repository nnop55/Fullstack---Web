import { setQuery } from "../services/database.service";
import { Car } from "../utils/interfaces";

export class CarRepository {

    constructor() { }

    public insertCar(car: Car, userId: number): Promise<void> {
        const sql = `INSERT INTO cars (type, mark, license_number, user_id) VALUES (?, ?, ?, ?)`;
        return new Promise<void>((resolve, reject) => {
            setQuery(sql, [car['type'], car['mark'], car['licenseNumber'], userId], (err: any, result: any) => {
                if (err) {
                    console.error('Error registering user:', err);
                    reject(err)
                    return;
                }
                resolve();
            })

        })
    }
}