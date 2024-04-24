import { Router } from "express";
import { verifyToken } from "../middleware/token.middleware";
import { requireRole } from "../middleware/role.middleware";
import asyncHandler from "../middleware/async-handler.middleware";
import HistoryController from "../controllers/history.controller";

const historyRouter: Router = Router();

historyRouter.post('/',
    verifyToken,
    requireRole,
    asyncHandler(HistoryController.getHistory)
);

export default historyRouter