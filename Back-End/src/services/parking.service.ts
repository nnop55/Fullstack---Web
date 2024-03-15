import { setQuery } from "../services/database.service";

export class ParkingService {

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
}