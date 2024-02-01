import { Request, Response } from 'express';

export type ApiResponseType = (req: Request, res: Response) => any;