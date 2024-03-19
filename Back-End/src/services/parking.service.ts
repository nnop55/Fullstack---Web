import { setQuery } from "../services/database.service";
import { Zone } from "../utils/interfaces";

class ParkingService {

    constructor() { }

    public getAllZones(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`SELECT * FROM parking_zones`, [],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result)
                })
        })
    }

    public insertZone(zone: Zone): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`INSERT INTO parking_zones (name, address, price, available) 
                        VALUES (?, ?, ?, ?)`,
                [zone['name'], zone['address'], zone['price'], 1], (err: any, result: any) => {
                    if (err) {
                        console.error('Error inserting zone:', err);
                        reject(err)
                        return;
                    }
                    resolve();
                })

        })
    }
}

export default new ParkingService();