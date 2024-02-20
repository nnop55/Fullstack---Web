import { ValidationResult } from "./interfaces";

export class Validator {

    public static validateLoginInput(email: string, password: string): ValidationResult[] {
        const errors: ValidationResult[] = [];

        if (!email) {
            errors.push({ field: 'email', message: 'Email is required' });
        } else if (!this.isValidEmail(email)) {
            errors.push({ field: 'email', message: 'Invalid email format' });
        }

        if (!password) {
            errors.push({ field: 'password', message: 'Password is required' });
        }

        return errors;
    }

    public static validateRegisterInput(email: string, password: string, fullName: string): ValidationResult[] {
        const errors: ValidationResult[] = [];

        if (!email) {
            errors.push({ field: 'email', message: 'Email is required' });
        } else if (!this.isValidEmail(email)) {
            errors.push({ field: 'email', message: 'Invalid email format' });
        }

        if (!fullName) {
            errors.push({ field: 'fullName', message: 'Fullname is required' });
        }
        if (!password) {
            errors.push({ field: 'password', message: 'Password is required' });
        }

        return errors;
    }

    public static validateEmailInput(email: string): ValidationResult[] {
        const errors: ValidationResult[] = [];

        if (!email) {
            errors.push({ field: 'email', message: 'Email is required' });
        } else if (!this.isValidEmail(email)) {
            errors.push({ field: 'email', message: 'Invalid email format' });
        }

        return errors;
    }

    public static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
