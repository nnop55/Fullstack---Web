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

    public updateZoneById(id: number, name: string, address: string, price: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setQuery(`UPDATE parking_zones SET 
                    name = ?, address = ?, 
                    price = ? 
                    WHERE id = ?`,
                [name, address, price, id], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
        });
    }

    public findZoneById(zoneId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            setQuery(`SELECT * FROM parking_zones WHERE id = ?`,
                [zoneId], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result.length > 0 ? result[0] : null);
                });
        });
    }
}

export default new ParkingService();