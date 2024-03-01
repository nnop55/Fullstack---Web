
export interface User {
    id: number,
    full_name: string,
    email: string,
    password: string
    code: number
}

export interface DBParams {
    host: string | undefined;
    username: string | undefined;
    pass: string | undefined;
    database: string | undefined;
}

export interface ValidationResult {
    field: string;
    message: string;
}
