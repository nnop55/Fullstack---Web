import { ValidationResult } from "../utils/interfaces";
import { Request, Response, NextFunction } from 'express';
import { Validator } from "../utils/validator";


export function validateLoginInput(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body;
    const validationErrors: ValidationResult[] = Validator.validateLoginInput(email, password);

    if (validationErrors.length > 0) {
        res.status(400).json({ code: 2, errors: validationErrors });
        return;
    }

    next();
}

export function validateRegisterInput(req: Request, res: Response, next: NextFunction): void {
    const { email, password, fullName, role } = req.body;
    const validationErrors: ValidationResult[] = Validator.validateRegisterInput(email, password, fullName, role);

    if (validationErrors.length > 0) {
        res.status(400).json({ code: 2, errors: validationErrors });
        return;
    }

    next();
}

export function validateEditProfileInput(req: Request, res: Response, next: NextFunction): void {
    const { email, fullName } = req.body;
    const validationErrors: ValidationResult[] = Validator.validateEditProfileInput(email, fullName);

    if (validationErrors.length > 0) {
        res.status(400).json({ code: 2, errors: validationErrors });
        return;
    }

    next();
}

export function validateEmailInput(req: Request, res: Response, next: NextFunction): void {
    const { email } = req.body;
    const validationErrors: ValidationResult[] = Validator.validateEmailInput(email);

    if (validationErrors.length > 0) {
        res.status(400).json({ code: 2, errors: validationErrors });
        return;
    }

    next();
}

export function validateCarInput(req: Request, res: Response, next: NextFunction): void {
    const { type, mark, licenseNumber } = req.body;
    const validationErrors: ValidationResult[] = Validator.validateCarInput({ type, mark, licenseNumber });

    if (validationErrors.length > 0) {
        res.status(400).json({ code: 2, errors: validationErrors });
        return;
    }

    next();
}