import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken"
import { JWTSecretKey } from '../config/config';
import { TokenService } from '../services/token.service';



export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
    }

    jwt.verify(token, JWTSecretKey!, async (err, decoded) => {
        if (err) {
            await TokenService.deleteToken(token!)
            return res.status(401).json({ error: 'Unauthorized: Invalid access token' });
        }

        const userInstance = await TokenService.findToken(token!)
        if (!userInstance) {
            res.status(401).json({ error: 'Unauthorized: Invalid access token' });
            return
        }

        (req as any).user = userInstance;
        next();
    });
};



