
export interface User {
    id: number,
    full_name: string,
    email: string,
    password: string
}

export interface DBParams {
    host: string | undefined;
    username: string | undefined;
    pass: string | undefined;
    name: string | undefined;
}
