import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken"
import { JWTSecretKey } from '../config';

export class TokenMiddleware {
    constructor() { }

    public verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
        }

        jwt.verify(token, JWTSecretKey!, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid access token' });
            }

            (req as any).user = decoded;
            next();
        });
    };

    public accessToken(user: { id: number, email: string }) {
        return jwt.sign(user, JWTSecretKey!, { expiresIn: '6h' });
    }
}