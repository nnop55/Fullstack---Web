import { ValidationResult } from "../utils/interfaces";
import { Request, Response, NextFunction } from 'express';
import { Validator } from "../utils/validator";


export function validateLoginInput(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body;
    const validationErrors: ValidationResult[] = Validator.validateLoginInput(email, password);

    if (validationErrors.length > 0) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    next();
}

export function validateRegisterInput(req: Request, res: Response, next: NextFunction): void {
    const { email, password, fullName } = req.body;
    const validationErrors: ValidationResult[] = Validator.validateRegisterInput(email, password, fullName);

    if (validationErrors.length > 0) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    next();
}

export function validateEmailInput(req: Request, res: Response, next: NextFunction): void {
    const { email } = req.body;
    const validationErrors: ValidationResult[] = Validator.validateEmailInput(email);

    if (validationErrors.length > 0) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    next();
}
