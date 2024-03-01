import { setQuery } from "../services/database-service";
import { VerificationEvent } from "../events/verification-event";
import { MailerService } from "../services/mailer-service";
import { User } from "../utils/interfaces";

export class AuthRepository {
    // private verificationEvent: VerificationEvent
    private mailer: MailerService

    constructor() {
        // this.verificationEvent = new VerificationEvent(db)
        this.mailer = new MailerService()
    }

    public findByEmail(email: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            setQuery('SELECT * FROM users WHERE email = ?',
                [email], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result.length > 0 ? result[0] : null);
                });
        });
    }

    public saveTokenToBlacklist(token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setQuery('INSERT INTO tokens_blacklist (access_token) VALUES (?)',
                [token], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
        });
    }

    public insertUser(email: string, fullName: string, hashedPassword: string): Promise<void> {
        const sql = `INSERT INTO users (email, full_name, password, balance) VALUES (?, ?, ?, ?)`;
        return new Promise<void>((resolve, reject) => {
            setQuery(sql, [email, fullName, hashedPassword, 100], (err: any, result: any) => {
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
            setQuery('UPDATE users SET code = ? WHERE email = ?',
                [verification, email], async (err: any, result: any) => {
                    if (err) {
                        console.error('Error logging in:', err);
                        reject(err)
                        return;
                    }
                    resolve();

                    await this.mailer.sentMail(email, verification)
                        .then(() => {
                            // this.verificationEvent.emitEvent(email)
                        }).catch((err: any) => {
                            console.error(err)
                        })

                });

        })
    }

    public changePassword(email: string, hashedPassword: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery('UPDATE users SET password = ? WHERE email = ?',
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
            setQuery('SELECT * FROM users', [],
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


