import { Request, Response, NextFunction } from 'express';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.error(err.stack);
        res.status(500).send(
            (err.message == "" || !err.message) ?
                "Internal Server Error" : err.message
        );
    });
};

export default asyncHandler;