import { setQuery } from "../services/database.service";
import { sentMail } from "../services/mailer.service";
import { User } from "../utils/interfaces";

export class AuthService {

    constructor() { }

    public findByEmail(email: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            setQuery(`SELECT * FROM users WHERE email = ?`,
                [email], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result.length > 0 ? result[0] : null);
                });
        });
    }

    public insertUser(email: string, fullName: string, hashedPassword: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`INSERT INTO users 
                    (email, full_name, password, balance) 
                    VALUES (?, ?, ?, ?)`,
                [email, fullName, hashedPassword, 100], (err: any, result: any) => {
                    if (err) {
                        console.error('Error registering user:', err);
                        reject(err)
                        return;
                    }
                    resolve();
                })

        })
    }

    public sendVerification(email: string): Promise<void> {
        const verification = Math.floor(100000 + Math.random() * 900000).toString();
        return new Promise<void>((resolve, reject) => {
            setQuery(`UPDATE users SET code = ? WHERE email = ?`,
                [verification, email], async (err: any, result: any) => {
                    if (err) {
                        console.error('Error logging in:', err);
                        reject(err)
                        return;
                    }
                    resolve();

                    await sentMail(email, verification)
                });

        })
    }

    public clearCodeColumn(email: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`UPDATE users SET code = ? WHERE email = ?`,
                [null, email], async (err, result) => {
                    if (err) {
                        console.error('Error updating in:', err);
                        reject(err)
                        return;
                    }
                    resolve();
                });
        })
    }

    public changePassword(email: string, hashedPassword: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`UPDATE users SET password = ? WHERE email = ?`,
                [hashedPassword, email], async (err, result) => {
                    if (err) {
                        console.error('Error logging in:', err);
                        reject(err)
                        return;
                    }
                    resolve();


                });
        })
    }

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


