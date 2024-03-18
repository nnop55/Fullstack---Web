import { NextFunction, Request, Response } from 'express';

export function requireRole(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;

    if (!user.hasOwnProperty('role') || user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
}