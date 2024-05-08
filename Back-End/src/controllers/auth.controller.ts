import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { getToken } from '../utils/token';
import { comparePasswords, hashPassword } from '../utils/bcrypt';

class AuthController {

    constructor() { }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const user = await AuthService.findByEmail(email);

        if (!user || !comparePasswords(password, user.password)) {
            res.status(400).json({ code: 2, error: 'Invalid email or password' });
            return;
        }

        const accessToken = getToken({ id: user.id, email: user.email });
        await TokenService.insertTokenInstance(accessToken, user.id)
        res.status(201).json({ code: 1, data: { accessToken, role: user.role }, message: "Success" });
    }

    public async register(req: Request, res: Response): Promise<void> {
        const { fullName, password, email, role } = req.body;
        const hashedPassword = hashPassword(password);
        const user = await AuthService.findByEmail(email);

        if (user) {
            res.status(409).json({ code: 2, error: 'User already registered with this email' });
            return;
        }
        await AuthService.insertUser(email, fullName, hashedPassword, role)
        res.status(201).json({ code: 1, message: 'User registered successfully' });
    }

    public async sentCodeToEmail(req: Request, res: Response): Promise<void> {
        const { email, fromProfile } = req.body;
        const user = await AuthService.findByEmail(email);

        if (!user) {
            res.status(400).json({ code: 2, error: 'Account not found for this email' });
            return;
        }
        await AuthService.sendVerification(email)
        if (!fromProfile) {
            const accessToken = getToken({ id: user.id, email: user.email }, '10m');
            await TokenService.insertTokenInstance(accessToken, user.id)
            res.status(200).json({ code: 1, message: 'Check email, code is valid for 3 min', data: { accessToken } });
            return
        }
        res.status(200).json({ code: 1, message: 'Check email, code is valid for 3 min' });
    }

    public async verifyCode(req: Request, res: Response): Promise<void> {
        const { code } = req.body;
        const user = (req as any).user;
        if (!user) {
            res.status(400).json({ code: 2, error: 'Invalid email' });
            return
        }

        if (Date.now() > user['code_expire'].getTime()) {
            res.status(400).json({ code: 3, error: 'Verification code has expired' });
            return;
        }

        if (code !== user.code) {
            res.status(400).json({ code: 2, error: 'Incorrect code' });
            return
        }

        await AuthService.clearCodeColumn(user.email)

        res.status(200).json({ code: 1, message: 'Success' });
    }

    public async passwordRecover(req: Request, res: Response): Promise<void> {
        const { password } = req.body;
        const user = (req as any).user;

        if (user.code !== null) {
            res.status(400).json({ code: 2, error: 'Invalid verification' });
            return
        }

        const hashedPassword = hashPassword(password);
        await AuthService.changePassword(user.email, hashedPassword)
        res.status(200).json({ code: 1, message: 'Successfully changed' });
    }

}

export default new AuthController();