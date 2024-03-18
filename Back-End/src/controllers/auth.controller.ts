import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { IBcrypt } from '../utils/interfaces';
import { getToken } from '../utils/token';

export class AuthController {

    private authService: AuthService
    constructor(private bcrypt: IBcrypt) {
        this.authService = new AuthService()
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await this.authService.findByEmail(email);

            if (!user || !this.bcrypt.compareSync(password, user.password)) {
                res.status(400).json({ error: 'Invalid email or password' });
                return;
            }

            const accessToken = getToken({ id: user.id, email: user.email });
            await TokenService.insertTokenInstance(accessToken, user.id)
            res.status(201).json({ accessToken });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }


    public async editUser(req: Request, res: Response): Promise<void> {
        try {
            let { email, fullName } = req.body;
            const user = (req as any).user;
            const userId = parseInt(req.params.userId);

            if (userId !== user['id']) {
                res.status(400).json({ message: "Invalid input" });
                return;
            }

            await this.authService.updateUserById(
                userId,
                email ?? user.email,
                fullName ?? user.fullName
            )

            res.status(200).json({ message: "Success" });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

    public async logout(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            await TokenService.deleteToken(token!)
            res.status(200).json({ message: 'Logout successful' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { fullName, password, email } = req.body;
            const hashedPassword = this.bcrypt.hashSync(password, 10);
            const user = await this.authService.findByEmail(email);

            if (user) {
                res.status(409).json({ message: 'User already registered with this email' });
                return;
            }
            await this.authService.insertUser(email, fullName, hashedPassword)
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async sentCodeToEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email, fromProfile } = req.body;
            const user = await this.authService.findByEmail(email);

            if (!user) {
                res.status(400).json({ message: 'Invalid email' });
                return;
            }
            await this.authService.sendVerification(email)
            if (!fromProfile) {
                const accessToken = getToken({ id: user.id, email: user.email }, '10m');
                await TokenService.insertTokenInstance(accessToken, user.id)
                res.status(200).json({ message: 'Check email, code is valid for 3 min', accessToken });
                return
            }
            res.status(200).json({ message: 'Check email, code is valid for 3 min' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async verifyCode(req: Request, res: Response): Promise<void> {
        try {
            const { code } = req.body;
            const user = (req as any).user;
            if (!user) {
                res.status(400).json({ message: 'Invalid email' });
                return
            }

            if (code != user.code) {
                res.status(400).json({ message: 'Incorrect code' });
                return
            }

            await this.authService.clearCodeColumn(user.email)

            res.status(200).json({ message: 'Success' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async passwordRecover(req: Request, res: Response): Promise<void> {
        try {
            const { password } = req.body;
            const user = (req as any).user;

            if (user.code !== null) {
                res.status(400).json({ message: 'Invalid verification' });
                return
            }

            const hashedPassword = this.bcrypt.hashSync(password, 10);
            await this.authService.changePassword(user.email, hashedPassword)
            res.status(200).json({ message: 'Successfully changed' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.authService.getAllUser()
            res.status(200).json({ data: result });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params
            const user = await this.authService.findUserById(parseInt(userId))

            if (!user) {
                res.status(400).json({ error: 'User not found' });
                return;
            }

            res.status(200).json({ data: user });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}