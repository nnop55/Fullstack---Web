import jwt from "jsonwebtoken"
import { JWTSecretKey } from '../config';

export function getToken(user: { id: number, email: string }) {
    return jwt.sign(user, JWTSecretKey!, { expiresIn: '6h' });
}