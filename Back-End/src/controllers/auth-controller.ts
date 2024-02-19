import { Request, Response } from 'express';
import bcrypt from "bcrypt"
import { Database } from '../data-access/database';
import { CustomSession } from '../utils/interfaces';
import { TokenMiddleware } from '../middleware/token-middleware';
import { MailerService } from '../services/mailer-service';
import { VerificationEvent } from '../events/verification-event';

export class AuthController {

    private mailer: MailerService
    private verificationEvent: VerificationEvent


    constructor(protected token: TokenMiddleware, protected db: Database) {
        this.mailer = new MailerService()
        this.verificationEvent = new VerificationEvent(db)
    }



    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const sql = 'SELECT * FROM users WHERE email = ?';

            if (!email || !password) {
                res.status(401).json({ error: 'Email and password are required' });
                return;
            }

            return await new Promise<void>((resolve, reject) => {
                this.db.setQuery(sql, [email], (err, result) => {
                    if (err) {
                        console.error('Error logging in:', err);
                        reject(err)
                        return;
                    }
                    resolve();

                    if (result.length === 0 || !bcrypt.compareSync(password, result[0].password)) {
                        res.status(401).json({ error: 'Invalid email or password' });
                        return;
                    }
                    const user = { id: result[0].id, email: result[0].email }
                    const accessToken = this.token.accessToken(user);
                    (req.session as CustomSession).user = { email };
                    res.status(201).json({ accessToken });
                });
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

    public async logout(req: Request, res: Response): Promise<void> {
        try {
            return await new Promise<void>((resolve, reject) => {
                req.session.destroy((error) => {
                    if (error) {
                        console.error('Error:', error);
                        reject(error)
                        return;
                    }
                    resolve();
                });
                res.status(200).json({ message: 'Logout successful' });
            })

        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { fullName, password, email } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const sql = `INSERT INTO users (email, full_name, password, balance) VALUES (?, ?, ?, ?)`;

            if (!email || !password || !fullName) {
                res.status(401).json({ error: 'All fields are required' });
                return;
            }

            return await new Promise<void>((resolve, reject) => {
                this.db.setQuery(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
                    if (err) {
                        console.error('Error checking user:', err);
                        reject(err)
                        return;
                    }
                    if (result.length > 0) {
                        res.status(409).json({ message: 'User already registered with this email' });
                        return
                    }

                    this.db.setQuery(sql, [email, fullName, hashedPassword, 100], (err, result) => {
                        if (err) {
                            console.error('Error registering user:', err);
                            reject(err)
                            return;
                        }
                        resolve();
                    })
                    res.status(201).json({ message: 'User registered successfully' });
                })

            })

        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async sentCodeToEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const verification = Math.floor(100000 + Math.random() * 900000).toString();
            const sql = 'UPDATE users SET code = ? WHERE email = ?';

            if (!email) {
                res.status(401).json({ error: 'Email is required' });
                return;
            }

            return await new Promise<void>((resolve, reject) => {
                this.db.setQuery(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
                    if (err) {
                        console.error('Error checking user:', err);
                        reject(err)
                        return;
                    }

                    if (result.length < 1) {
                        res.status(401).json({ message: 'Invalid email' });
                        return
                    }

                    this.db.setQuery(sql, [verification, email], async (err, result) => {
                        if (err) {
                            console.error('Error logging in:', err);
                            reject(err)
                            return;
                        }
                        resolve();

                        await this.mailer.sentMail(email, verification)
                            .then(() => {
                                this.verificationEvent.emitEvent(email)
                                res.status(200).json({ message: 'Check email, code is valid for 3 min' });
                            })
                            .catch((err) => {
                                res.status(500).json({ error: 'Failed to verify' });
                            })
                    });
                })

            })

        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async verifyCode(req: Request, res: Response): Promise<void> {
        try {
            const { email, code } = req.body;
            const sql = 'SELECT * FROM users WHERE email = ?';

            return await new Promise<void>((resolve, reject) => {
                this.db.setQuery(sql, [email], (err, result) => {
                    if (err) {
                        console.error('Error checking user:', err);
                        reject(err)
                        return;
                    }

                    if (result.length < 1) {
                        res.status(401).json({ message: 'Invalid email' });
                        return
                    }

                    if (code != result[0].code) {
                        res.status(401).json({ message: 'Incorrect code' });
                        return
                    }

                    res.status(200).json({ message: 'Success' });
                })
            })

        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async passwordRecover(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const sql = 'UPDATE users SET password = ? WHERE email = ?';

            return await new Promise<void>((resolve, reject) => {
                this.db.setQuery(sql, [hashedPassword, email], async (err, result) => {
                    if (err) {
                        console.error('Error logging in:', err);
                        reject(err)
                        return;
                    }
                    resolve();

                    res.status(200).json({ message: 'Successfully changed' });
                });
            })

        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const result = await new Promise<void>((resolve, reject) => {
                this.db.setQuery('SELECT * FROM users', [], (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result)
                })
            })
            res.status(201).json({ data: result });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}