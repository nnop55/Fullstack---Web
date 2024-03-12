import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/token.middleware";
import { validateEmailInput, validateLoginInput, validateRegisterInput } from "../middleware/validator.middleware";
import bcrypt from "bcrypt"

export class AuthRouter {
    private router: Router;
    private authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController(bcrypt);
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', verifyToken, (req, res) => this.authController.getUsers(req, res));
        this.router.get('/:userId', verifyToken, (req, res) => this.authController.getUserById(req, res));
        this.router.post('/login', validateLoginInput, (req, res) => this.authController.login(req, res));
        this.router.post('/register', validateRegisterInput, (req, res) => this.authController.register(req, res));
        this.router.post('/logout', verifyToken, (req, res) => this.authController.logout(req, res));
        this.router.post('/verify-email', validateEmailInput, (req, res) => this.authController.sentCodeToEmail(req, res));
        this.router.post('/verify-code', (req, res) => this.authController.verifyCode(req, res));
        this.router.post('/recover-password', (req, res) => this.authController.passwordRecover(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }

}