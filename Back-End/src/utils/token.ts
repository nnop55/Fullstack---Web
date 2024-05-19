import jwt from "jsonwebtoken"
import { JWTSecretKey } from '../config/config';

export function getToken(user: { id: number, email: string }, time: string = '6h') {
    return jwt.sign(user, JWTSecretKey!, { expiresIn: time });
}


