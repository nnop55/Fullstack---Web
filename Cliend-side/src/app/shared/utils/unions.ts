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

export interface TableColumn {
    key: string;
    label: string;
}

export type RouteMode = 'signin' | 'signup'
