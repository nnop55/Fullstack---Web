import { FormControl } from "@angular/forms"

export enum Role {
    user,
    admin
}

export enum Status {
    success = 1,
    error,
    expire
}

export enum Steps {
    email = 1,
    code,
    recover
}


export type RegisterForm = {
    email: FormControl<string | null>,
    fullName: FormControl<string | null>,
    role: FormControl<number | null>,
    password: FormControl<string | null>,
    confirmPassword: FormControl<string | null>,
}

export type LoginForm = {
    email: FormControl<string | null>,
    password: FormControl<string | null>,
}

export type EmailForm = {
    email: FormControl<string | null>,
}

export type CodeForm = {
    code: FormControl<string | null>,
}

export type PasswordForm = {
    password: FormControl<string | null>,
    confirmPassword: FormControl<string | null>,
}

export type RouteMode = 'in' | 'up'
