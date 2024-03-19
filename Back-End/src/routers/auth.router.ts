import { Router } from "express";
import { verifyToken } from "../middleware/token.middleware";
import { validateEditProfileInput, validateEmailInput, validateLoginInput, validateRegisterInput } from "../middleware/validator.middleware";
import { Request, Response } from 'express';
import asyncHandler from "../middleware/async-handler.middleware";
import AuthController from "../controllers/auth.controller";

class AuthRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
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
            validateLoginInput,
            asyncHandler((req: Request, res: Response) =>
                AuthController.login(req, res))
        );
        this.router.post('/register',
            validateRegisterInput,
            asyncHandler((req: Request, res: Response) =>
                AuthController.register(req, res))
        );
        this.router.post('/logout',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                AuthController.logout(req, res))
        );
        this.router.post('/verify-email',
            validateEmailInput,
            asyncHandler((req: Request, res: Response) =>
                AuthController.sentCodeToEmail(req, res))
        );
        this.router.post('/verify-code',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                AuthController.verifyCode(req, res))
        );
        this.router.post('/recover-password',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                AuthController.passwordRecover(req, res))
        );
        this.router.put('/edit/:userId',
            verifyToken,
            validateEditProfileInput,
            asyncHandler((req: Request, res: Response) =>
                AuthController.editUser(req, res))
        );
    }

    public getRouter(): Router {
        return this.router;
    }

}

export default new AuthRouter();