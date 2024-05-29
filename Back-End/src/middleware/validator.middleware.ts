import { Request, Response, NextFunction } from 'express';
import { ClassType } from 'class-transformer-validator';
import { validate } from 'class-validator';


export function validationMiddleware<T extends object>(dtoClass: ClassType<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = new dtoClass()
        Object.assign(dtoInstance, req.body);

        const errors = await validate(dtoInstance)

        if (errors.length > 0) {
            const errorMessage =
                errors.map(error => Object.values(error.constraints!)).join(', ');

            return res.status(400).json(
                {
                    code: 2,
                    error: 'Validation failed',
                    errors: errorMessage
                }
            )
        }
        next();
    };
}
