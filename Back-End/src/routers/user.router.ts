import { Router } from "express";
import { verifyToken } from "../middleware/token.middleware";
import { Request, Response } from 'express';
import UserController from "../controllers/user.controller";
import asyncHandler from "../middleware/async-handler.middleware";
import { validationMiddleware } from "../middleware/validator.middleware";
import { EditUserDto } from "../dtos/edit-user.dto";

class AuthRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/roles',
            asyncHandler((req: Request, res: Response) =>
                UserController.getUserRoles(req, res))
        );
        this.router.get('/',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                UserController.getUsers(req, res))
        );
        this.router.get('/:userId',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                UserController.getUserById(req, res))
        );
        this.router.post('/logout',
            verifyToken,
            asyncHandler((req: Request, res: Response) =>
                UserController.logout(req, res))
        );
        this.router.put('/edit/:userId',
            verifyToken,
            validationMiddleware(EditUserDto),
            asyncHandler((req: Request, res: Response) =>
                UserController.editUser(req, res))
        );
    }

    public getRouter(): Router {
        return this.router;
    }

}

export default new AuthRouter();