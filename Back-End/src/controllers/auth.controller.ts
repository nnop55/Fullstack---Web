import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { IBcrypt } from '../utils/interfaces';
import { getToken } from '../utils/token';
import bcrypt from "bcrypt"

class AuthController {

    constructor(private bcrypt: IBcrypt) { }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const user = await AuthService.findByEmail(email);

        if (!user || !this.bcrypt.compareSync(password, user.password)) {
            res.status(400).json({ code: 2, error: 'Invalid email or password' });
            return;
        }

        const accessToken = getToken({ id: user.id, email: user.email });
        await TokenService.insertTokenInstance(accessToken, user.id)
        res.status(201).json({ code: 1, data: { accessToken, role: user.role } });
    }


    public async editUser(req: Request, res: Response): Promise<void> {
        let { email, fullName } = req.body;
        const user = (req as any).user;
        const userId = parseInt(req.params.userId);

        if (userId !== user['id']) {
            res.status(400).json({ code: 2, message: "Invalid input" });
            return;
        }

        await AuthService.updateUserById(
            userId,
            email ?? user.email,
            fullName ?? user.fullName
        )

        res.status(200).json({ code: 1, message: "Success" });
    }

    public async logout(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(' ')[1];
        await TokenService.deleteToken(token!)
        res.status(200).json({ code: 1, message: 'Logout successful' });
    }

    public async register(req: Request, res: Response): Promise<void> {
        const { fullName, password, email } = req.body;
        const hashedPassword = this.bcrypt.hashSync(password, 10);
        const user = await AuthService.findByEmail(email);

        if (user) {
            res.status(409).json({ code: 2, message: 'User already registered with this email' });
            return;
        }
        await AuthService.insertUser(email, fullName, hashedPassword)
        res.status(201).json({ code: 1, message: 'User registered successfully' });
    }

    public async sentCodeToEmail(req: Request, res: Response): Promise<void> {
        const { email, fromProfile } = req.body;
        const user = await AuthService.findByEmail(email);

        if (!user) {
            res.status(400).json({ code: 2, message: 'Invalid email' });
            return;
        }
        await AuthService.sendVerification(email)
        if (!fromProfile) {
            const accessToken = getToken({ id: user.id, email: user.email }, '10m');
            await TokenService.insertTokenInstance(accessToken, user.id)
            res.status(200).json({ code: 1, message: 'Check email, code is valid for 3 min', accessToken });
            return
        }
        res.status(200).json({ code: 1, message: 'Check email, code is valid for 3 min' });
    }

    public async verifyCode(req: Request, res: Response): Promise<void> {
        const { code } = req.body;
        const user = (req as any).user;
        if (!user) {
            res.status(400).json({ code: 2, message: 'Invalid email' });
            return
        }

        if (code != user.code) {
            res.status(400).json({ code: 2, message: 'Incorrect code' });
            return
        }

        await AuthService.clearCodeColumn(user.email)

        res.status(200).json({ code: 1, message: 'Success' });
    }

    public async passwordRecover(req: Request, res: Response): Promise<void> {
        const { password } = req.body;
        const user = (req as any).user;

        if (user.code !== null) {
            res.status(400).json({ code: 2, message: 'Invalid verification' });
            return
        }

        const hashedPassword = this.bcrypt.hashSync(password, 10);
        await AuthService.changePassword(user.email, hashedPassword)
        res.status(200).json({ code: 1, message: 'Successfully changed' });
    }


    public async getUsers(req: Request, res: Response): Promise<void> {
        const result = await AuthService.getAllUser()
        res.status(200).json({ code: 1, data: result });
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        const { userId } = req.params
        const user = await AuthService.findUserById(parseInt(userId))

        if (!user) {
            res.status(400).json({ code: 2, error: 'User not found' });
            return;
        }

        res.status(200).json({ code: 1, data: user });
    }

    public async getUserRoles(req: Request, res: Response): Promise<void> {
        const result = [
            { value: 0, label: 'User' },
            { value: 1, label: 'Admin' }
        ]

        res.status(200).json({ code: 1, data: result });
    }

}

export default new AuthController(bcrypt);