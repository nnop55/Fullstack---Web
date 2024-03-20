import { NextFunction, Request, Response } from 'express';
import { Role } from '../utils/interfaces';

export function requireRole(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;

    if (!user.hasOwnProperty('role') || user.role !== Role.admin) {
        return res.status(403).json({ code: 2, error: 'No permission' });
    }

    next();
}