import { Router } from "express";
import { verifyToken } from "../middleware/token.middleware";
import { requireRole } from "../middleware/role.middleware";
import { Request, Response } from 'express';
import asyncHandler from "../middleware/async-handler.middleware";
import HistoryController from "../controllers/history.controller";

class HistoryRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/',
            verifyToken,
            requireRole,
            asyncHandler((req: Request, res: Response) =>
                HistoryController.getHistory(req, res))
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default new HistoryRouter()