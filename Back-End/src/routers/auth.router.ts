import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/token.middleware";
import { validateEditProfileInput, validateEmailInput, validateLoginInput, validateRegisterInput } from "../middleware/validator.middleware";
import { Request, Response } from 'express';
import bcrypt from "bcrypt"
import asyncHandler from "../middleware/async-handler.middleware";

export class AuthRouter {
    private router: Router;
    private authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController(bcrypt);
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                this.authController.getUsers(req, res))
        );
        this.router.get('/:userId',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                this.authController.getUserById(req, res))
        );
        this.router.post('/login',
            validateLoginInput,
            asyncHandler((req: Request, res: Response) =>
                this.authController.login(req, res))
        );
        this.router.post('/register',
            validateRegisterInput,
            asyncHandler((req: Request, res: Response) =>
                this.authController.register(req, res))
        );
        this.router.post('/logout',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                this.authController.logout(req, res))
        );
        this.router.post('/verify-email',
            validateEmailInput,
            asyncHandler((req: Request, res: Response) =>
                this.authController.sentCodeToEmail(req, res))
        );
        this.router.post('/verify-code',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                this.authController.verifyCode(req, res))
        );
        this.router.post('/recover-password',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                this.authController.passwordRecover(req, res))
        );
        this.router.put('/edit/:userId',
            verifyToken,
            validateEditProfileInput,
            asyncHandler((req: Request, res: Response) =>
                this.authController.editUser(req, res))
        );
    }

    public getRouter(): Router {
        return this.router;
    }

}