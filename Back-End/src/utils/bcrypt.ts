import bcrypt from "bcrypt"

export function comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword)
}

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10)
}