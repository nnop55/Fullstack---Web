import { setQuery } from "./database.service";

class HistoryService {

    constructor() { }

    public getHistories(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            setQuery(`SELECT 
                        parking_history.id AS id,
                        cars.id AS car_id,
                        cars.mark, 
                        cars.type, 
                        cars.user_id,
                        cars.license_number, 
                        parking_zones.id AS zone_id,
                        parking_zones.name,
                        parking_zones.address,
                        parking_zones.price,
                        parking_zones.available
                    FROM parking_history
                    JOIN cars ON parking_history.car_id = cars.id
                    JOIN parking_zones ON parking_history.zone_id = parking_zones.id`,
                [], (err: any, result: any) => {
                    if (err) {
                        console.error('Error finding history:', err);
                        reject(err)
                        return;
                    }
                    resolve(result);

                })
        })
    }

    public insertItem(carId: number, zoneId: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`INSERT INTO 
                        parking_history (car_id, zone_id, user_id) 
                        VALUES (?, ?, ?)`,
                [carId, zoneId, userId], (err: any, result: any) => {
                    if (err) {
                        console.error('Error inserting/updating:', err);
                        reject(err)
                        return;
                    }
                    resolve();
                })

        })
    }
}

export default new HistoryService()