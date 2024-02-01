import { Request, Response } from 'express';

export class User {
    constructor() { }

    public async signIn(req: Request, res: Response): Promise<void> {
        res.send('signIn');
    }

    public logout(req: Request, res: Response): void {
        res.send('logout');
    }
}