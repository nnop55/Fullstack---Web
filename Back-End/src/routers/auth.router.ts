import { Router } from "express";
import { verifyToken } from "../middleware/token.middleware";
import { Request, Response } from 'express';
import asyncHandler from "../middleware/async-handler.middleware";
import AuthController from "../controllers/auth.controller";
import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { validationMiddleware } from "../middleware/validator.middleware";
import { EditUserDto } from "../dtos/edit-user.dto";
import { VerifyEmailDto } from "../dtos/verify-email.dto";
import { VerifyCodeDto } from "../dtos/verify-code.dto";
import { RecoverPasswordDto } from "../dtos/recover-password.dto";

class AuthRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/roles',
            asyncHandler((req: Request, res: Response) =>
                AuthController.getUserRoles(req, res))
        );
        this.router.get('/',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                AuthController.getUsers(req, res))
        );
        this.router.get('/:userId',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                AuthController.getUserById(req, res))
        );
        this.router.post('/login',
            validationMiddleware(LoginUserDto),
            asyncHandler((req: Request, res: Response) =>
                AuthController.login(req, res))
        );
        this.router.post('/register',
            validationMiddleware(RegisterUserDto),
            asyncHandler((req: Request, res: Response) =>
                AuthController.register(req, res))
        );
        this.router.post('/logout',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                AuthController.logout(req, res))
        );
        this.router.post('/verify-email',
            validationMiddleware(VerifyEmailDto),
            asyncHandler((req: Request, res: Response) =>
                AuthController.sentCodeToEmail(req, res))
        );
        this.router.post('/verify-code',
            verifyToken,
            validationMiddleware(VerifyCodeDto),
            asyncHandler((req: Request, res: Response) =>
                AuthController.verifyCode(req, res))
        );
        this.router.post('/recover-password',
            verifyToken,
            validationMiddleware(RecoverPasswordDto),
            asyncHandler((req: Request, res: Response) =>
                AuthController.passwordRecover(req, res))
        );
        this.router.put('/edit/:userId',
            verifyToken,
            validationMiddleware(EditUserDto),
            asyncHandler((req: Request, res: Response) =>
                AuthController.editUser(req, res))
        );
    }

    public getRouter(): Router {
        return this.router;
    }

}

export default new AuthRouter();