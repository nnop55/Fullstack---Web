import { Request, Response } from 'express';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Database } from '../data-access/database';

export class User {
    constructor() { }

    public async login(req: Request, res: Response, db: Database): Promise<void> {
        const { email, password } = req.body;

        const sql = 'SELECT * FROM users WHERE email = ?';
        db.setQuery(sql, [email], (err, result) => {
            if (err) {
                console.error('Error logging in:', err);
                res.status(500).json({ error: 'Failed to login' });
                return;
            }

            if (result.length === 0 || !bcrypt.compareSync(password, result[0].password)) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }

            const accessToken = jwt.sign({ email: result[0].email }, 'your_secret_key', { expiresIn: '1h' });
            res.json({ accessToken });
        });
    }

    public logout(req: Request, res: Response): void {
        res.send('logout');
    }

    public async register(req: Request, res: Response, db: Database): Promise<void> {
        const { fullName, password, email } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const sql = `INSERT INTO users (email, full_name, password) VALUES (?, ?, ?)`;

        db.setQuery(sql, [email, fullName, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                res.status(500).json({ error: 'Failed to register user' });
                return;
            }
            res.status(201).json({ message: 'User registered successfully' });
        })
    }

    public async getUsers(req: Request, res: Response, db: Database) {
        db.setQuery('SELECT * FROM users', [], (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Failed to fetch users' });
                return;
            }

            res.status(201).json({ data: result });
        })
    }

}