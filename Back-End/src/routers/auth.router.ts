import { Router } from "express";
import { verifyToken } from "../middleware/token.middleware";
import asyncHandler from "../middleware/async-handler.middleware";
import AuthController from "../controllers/auth.controller";
import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { validationMiddleware } from "../middleware/validator.middleware";
import { VerifyEmailDto } from "../dtos/verify-email.dto";
import { VerifyCodeDto } from "../dtos/verify-code.dto";
import { RecoverPasswordDto } from "../dtos/recover-password.dto";

const authRouter: Router = Router();


authRouter.post('/login',
    validationMiddleware(LoginUserDto),
    asyncHandler(AuthController.login)
);
authRouter.post('/register',
    validationMiddleware(RegisterUserDto),
    asyncHandler(AuthController.register)
);
authRouter.post('/verify-email',
    validationMiddleware(VerifyEmailDto),
    asyncHandler(AuthController.sentCodeToEmail)
);
authRouter.post('/verify-code',
    validationMiddleware(VerifyCodeDto),
    verifyToken,
    asyncHandler(AuthController.verifyCode)
);
authRouter.post('/recover-password',
    validationMiddleware(RecoverPasswordDto),
    verifyToken,
    asyncHandler(AuthController.passwordRecover)
);


export default authRouter;