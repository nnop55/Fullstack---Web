import { Request, Response } from 'express';
import { TokenService } from '../services/token.service';
import UserService from '../services/user.service';

class UserController {
    constructor() { }

    public async editUser(req: Request, res: Response): Promise<void> {
        const { email, fullName } = req.body;
        const user = (req as any).user;
        const userId = parseInt(req.params.userId);

        if (userId !== user['id']) {
            res.status(400).json({ code: 2, error: "Invalid input" });
            return;
        }

        await UserService.updateUserById(
            userId,
            email ?? user.email,
            fullName ?? user.fullName
        )

        res.status(200).json({ code: 1, message: "Success" });
    }

    public async getUsers(req: Request, res: Response): Promise<void> {
        const result = await UserService.getAllUser()
        res.status(200).json({ code: 1, data: result });
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        const { userId } = req.params
        const user = await UserService.findUserById(parseInt(userId))

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

    public async logout(req: Request, res: Response): Promise<void> {
        const user = (req as any).user;
        await TokenService.deleteToken(user.accessToken)
        res.status(200).json({ code: 1, message: 'Logout successful' });
    }
}

export default new UserController()