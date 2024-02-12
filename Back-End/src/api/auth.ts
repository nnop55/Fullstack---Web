import { Request, Response } from 'express';
import bcrypt from "bcrypt"
import { Database } from '../data-access/database';
import { CustomSession } from '../interface/interfaces';
import { Token } from '../services/token';
import { Mailer } from '../services/mailer';
import { VerificationEvent } from '../subscribers/vericiation-event';

export class Auth {

    private mailer: Mailer
    private verificationEvent: VerificationEvent

    constructor(private token: Token, private db: Database) {
        this.mailer = new Mailer()
        this.verificationEvent = new VerificationEvent(db)
        this.mailer.transporterVerify()
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const sql = 'SELECT * FROM users WHERE email = ?';
        try {
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
            res.status(500).json({ error: 'Failed to login' });
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
        const { fullName, password, email } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const sql = `INSERT INTO users (email, full_name, password, balance) VALUES (?, ?, ?, ?)`;

        try {
            return await new Promise<void>((resolve, reject) => {
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

        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to register user' });
        }
    }

    public async sentCodeToEmail(req: Request, res: Response): Promise<void> {
        const { email } = req.body;
        const verification = Math.floor(100000 + Math.random() * 900000).toString();
        const sql = 'UPDATE users SET code = ? WHERE email = ?';
        try {
            return await new Promise<void>((resolve, reject) => {
                this.db.setQuery(sql, [verification, email], async (err, result) => {
                    if (err) {
                        console.error('Error logging in:', err);
                        reject(err)
                        return;
                    }
                    resolve();

                    if (result.changedRows === 0) {
                        res.status(401).json({ error: 'Invalid email' });
                        return;
                    }
                    await this.mailer.sentMail(email, verification, res)
                    this.verificationEvent.emitEvent(email)
                });
            })

        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to verify' });
        }
    }

    public async passwordRecover(req: Request, res: Response): Promise<void> {
        const verification = Math.floor(100000 + Math.random() * 900000).toString();
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
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }

}