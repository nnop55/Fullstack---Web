
export interface User {
    id: number,
    fullName: string,
    email: string,
    password: string
    code: number
    role: string
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

export interface IBcrypt {
    compareSync(pass: string, hashedPass: string): boolean;
    hashSync(pass: string, length: number): string;
}

export interface Car {
    type: string,
    mark: string,
    licenseNumber: string
    userId?: number
}

export interface CarRes {
    type: string,
    mark: string,
    license_number: string
    user_id?: number
}

export interface Zone {
    name: string,
    address: string,
    price: string
}

export enum ParkingZone {
    occupied,
    available
}