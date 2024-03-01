import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken"
import { JWTSecretKey } from '../config';
import { TokenRepository } from '../repositories/token-repository';



export function verifyToken(req: Request, res: Response, next: NextFunction) {
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

export function getToken(user: { id: number, email: string }) {
    return jwt.sign(user, JWTSecretKey!, { expiresIn: '6h' });
}

export async function tokenIsInBlacklist(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const isBlacklist = await TokenRepository.findToken(token!)
        if (isBlacklist) {
            res.status(401).json({ error: 'Unauthorized: Invalid access token' });
            return
        }
        next();
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};
