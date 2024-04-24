import { Router } from "express";
import { verifyToken } from "../middleware/token.middleware";
import { Request, Response } from 'express';
import UserController from "../controllers/user.controller";
import asyncHandler from "../middleware/async-handler.middleware";
import { validationMiddleware } from "../middleware/validator.middleware";
import { EditUserDto } from "../dtos/edit-user.dto";

const userRouter: Router = Router()

userRouter.get('/roles',
    asyncHandler(UserController.getUserRoles)
);
userRouter.get('/',
    verifyToken,
    asyncHandler(UserController.getUsers)
);
userRouter.get('/:userId',
    verifyToken,
    asyncHandler(UserController.getUserById)
);
userRouter.post('/logout',
    verifyToken,
    asyncHandler(UserController.logout)
);
userRouter.put('/edit/:userId',
    validationMiddleware(EditUserDto),
    verifyToken,
    asyncHandler(UserController.editUser)
);

export default userRouter