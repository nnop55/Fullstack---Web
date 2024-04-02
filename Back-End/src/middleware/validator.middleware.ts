import { Request, Response, NextFunction } from 'express';
import { ClassType } from 'class-transformer-validator';
import { validate } from 'class-validator';


async function validateRequestDto<T extends object>(dtoClass: ClassType<T>, body: any): Promise<T | string[]> {
    const dtoInstance = new dtoClass();

    Object.assign(dtoInstance, body);

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
        return errors.map(error => Object.values(error.constraints || {}).join('; '));
    }

    return dtoInstance;
}

export function validationMiddleware<T extends object>(dtoClass: ClassType<T>): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validationResultOrErrors = await validateRequestDto(dtoClass, req.body);

        if (Array.isArray(validationResultOrErrors)) {
            res.status(400).json({ code: 2, error: 'Validation failed', errors: validationResultOrErrors });
            return;
        }

        next();
    };
}
