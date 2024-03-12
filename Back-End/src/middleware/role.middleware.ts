import { NextFunction, Request, Response } from 'express';

export function requireRole(req: Request, res: Response, next: NextFunction) {
    const userRole = (req as any).user.role;

    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
}