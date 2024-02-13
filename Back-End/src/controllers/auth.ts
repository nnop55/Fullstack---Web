import { Request, Response, Router } from 'express';
import bcrypt from "bcrypt"
import { Database } from '../data-access/database';
import { CustomSession } from '../interface/interfaces';
import { TokenService } from '../services/token-service';
import { MailerService } from '../services/mailer-service';
import { VerificationEvent } from '../events/verification-event';

export class Auth {

    private mailer: MailerService
    private verificationEvent: VerificationEvent
    public router: Router

    constructor(private token: TokenService, private db: Database) {
        this.mailer = new MailerService()
        this.verificationEvent = new VerificationEvent(db)
        this.router = Router()
        this.mailer.transporterVerify().then(() => {
            this.initRoutes()
        }).catch((error) => {
            console.error('Failed to execute USER routes', error);
        })
    }

    initRoutes() {
        this.router.post('/login', (req, res) => {
            this.login(req, res)
        });
        this.router.post('/register', (req, res) => {
            this.register(req, res)
        });
        this.router.post('/logout', this.token.verifyToken, (req, res) => {
            this.logout(req, res)
        });
        this.router.post('/verify-email', (req, res) => {
            this.sentCodeToEmail(req, res)
        });
        this.router.get('/get-users', this.token.verifyToken, (req, res) => {
            this.getUsers(req, res)
        });
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
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // public async passwordRecover(req: Request, res: Response): Promise<void> {
    //     const verification = Math.floor(100000 + Math.random() * 900000).toString();
    // }


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