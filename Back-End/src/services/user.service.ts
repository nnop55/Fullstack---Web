import { User } from "../utils/interfaces";
import { setQuery } from "./database.service";

class UserService {
    constructor() { }

    public getAllUser(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`SELECT * FROM users`, [],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result)
                })
        })
    }

    public findUserById(id: number): Promise<User | null> {
        return new Promise((resolve, reject) => {
            setQuery(`SELECT * FROM users WHERE id = ?`,
                [id], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result.length > 0 ? result[0] : null);
                });
        });
    }

    public updateUserById(id: number, email: string, fullName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setQuery(`UPDATE users SET email = ?, full_name = ? WHERE id = ?`,
                [email, fullName, id], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
        });
    }

}

export default new UserService()