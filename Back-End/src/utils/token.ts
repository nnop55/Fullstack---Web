import jwt from "jsonwebtoken"
import { JWTSecretKey } from '../config/config';

export function getToken(user: { id: number, email: string }, time: string = '1m') {
    return jwt.sign(user, JWTSecretKey!, { expiresIn: time });
}


