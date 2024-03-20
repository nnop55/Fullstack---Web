export enum Role {
    user,
    admin
}

export enum Status {
    success = 1,
    error
}

export enum Steps {
    email = 1,
    code,
    recover
}

export type RouteMode = 'signin' | 'signup'
