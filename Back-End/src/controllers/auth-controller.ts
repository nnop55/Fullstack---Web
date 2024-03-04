import { Request, Response } from 'express';
import { AuthRepository } from '../repositories/auth-repository';
import { getToken } from '../middleware/token.middleware';
import { TokenRepository } from '../repositories/token-repository';
import { ITokenRepository } from '../utils/interfaces';

export class AuthController {

    private authRepository: AuthRepository
    constructor(private repository: AuthRepository,
        private token: ITokenRepository, private bcrypt: any) {
        this.authRepository = this.repository
    }



    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await this.authRepository.findByEmail(email);

            if (!user || !this.bcrypt.compareSync(password, user.password)) {
                res.status(400).json({ error: 'Invalid email or password' });
                return;
            }

            const accessToken = getToken({ id: user.id, email: user.email });
            await this.token.tokenInstance(accessToken)
            res.status(201).json({ accessToken });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

    public async logout(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            await TokenRepository.deleteToken(token!)
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
            const user = await this.authRepository.findByEmail(email);

            if (user) {
                res.status(409).json({ message: 'User already registered with this email' });
                return;
            }
            await this.authRepository.insertUser(email, fullName, hashedPassword)
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async sentCodeToEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const user = await this.authRepository.findByEmail(email);

            if (!user) {
                res.status(400).json({ message: 'Invalid email' });
                return;
            }
            await this.authRepository.sendVerification(email)
            res.status(200).json({ message: 'Check email, code is valid for 3 min' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async verifyCode(req: Request, res: Response): Promise<void> {
        try {
            const { email, code } = req.body;
            const user = await this.authRepository.findByEmail(email)

            if (!user) {
                res.status(400).json({ message: 'Invalid email' });
                return
            }

            if (code != user.code) {
                res.status(400).json({ message: 'Incorrect code' });
                return
            }

            res.status(200).json({ message: 'Success' });
            await this.authRepository.clearCodeColumn(email)
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async passwordRecover(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const hashedPassword = this.bcrypt.hashSync(password, 10);
            await this.authRepository.changePassword(email, hashedPassword)
            res.status(200).json({ message: 'Successfully changed' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.authRepository.getAllUser()
            res.status(200).json({ data: result });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}