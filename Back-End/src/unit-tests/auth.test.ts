import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Request, Response } from 'express';
import { getToken } from '../utils/token';
import { comparePasswords, hashPassword } from '../utils/bcrypt';

jest.mock('../services/auth.service');
jest.mock('../services/token.service');
jest.mock('../services/mailer.service');
jest.mock('../utils/token');
jest.mock('../utils/bcrypt');

describe('AuthController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should return 400 if user is not found', async () => {
            (AuthService.findByEmail as jest.Mock).mockResolvedValue(null);

            req.body = { email: 'test@example.com', password: 'password123' };

            await AuthController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ code: 2, error: 'Invalid email or password' });
        });

        it('should return 400 if password does not match', async () => {
            const user = { id: 1, email: 'test@example.com', password: 'hashedpassword', role: 'user' };
            (AuthService.findByEmail as jest.Mock).mockResolvedValue(user);
            (comparePasswords as jest.Mock).mockReturnValue(false);

            req.body = { email: 'test@example.com', password: 'password123' };

            await AuthController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ code: 2, error: 'Invalid email or password' });
        });

        it('should return 201 and token if email and password are correct', async () => {
            const user = { id: 1, email: 'test@example.com', password: 'hashedpassword', role: 'user' };
            const accessToken = 'fakeAccessToken';

            (AuthService.findByEmail as jest.Mock).mockResolvedValue(user);
            (comparePasswords as jest.Mock).mockReturnValue(true);
            (getToken as jest.Mock).mockReturnValue(accessToken);
            (TokenService.insertTokenInstance as jest.Mock).mockResolvedValue(true);

            req.body = { email: 'test@example.com', password: 'password123' };

            await AuthController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                code: 1,
                data: { accessToken, role: user.role },
                message: "Success"
            });
        });
    })

    describe('register', () => {
        it('should return 409 if user already exists', async () => {
            (AuthService.findByEmail as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

            req.body = { email: 'test@example.com', password: 'password123', fullName: 'Test User', role: 'user' };

            await AuthController.register(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ code: 2, error: 'User already registered with this email' });
        });

        it('should register the user if email is not taken', async () => {
            (AuthService.findByEmail as jest.Mock).mockResolvedValue(null);
            (hashPassword as jest.Mock).mockReturnValue('hashedpassword');
            (AuthService.insertUser as jest.Mock).mockResolvedValue(true);

            req.body = { email: 'test@example.com', password: 'password123', fullName: 'Test User', role: 'user' };

            await AuthController.register(req as Request, res as Response);

            expect(AuthService.insertUser).toHaveBeenCalledWith('test@example.com', 'Test User', 'hashedpassword', 'user');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ code: 1, message: 'User registered successfully' });
        });
    });

    describe('sentCodeToEmail', () => {
        it('should return 400 if user is not found', async () => {
            (AuthService.findByEmail as jest.Mock).mockResolvedValue(null);

            req.body = { email: 'test@example.com' };

            await AuthController.sentCodeToEmail(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ code: 2, error: 'Account not found for this email' });
        });

        it('should send verification code and token if fromProfile is false', async () => {
            const user = { id: 1, email: 'test@example.com' };
            const accessToken = 'fakeAccessToken';

            (AuthService.findByEmail as jest.Mock).mockResolvedValue(user);
            (AuthService.sendVerification as jest.Mock).mockResolvedValue(true);
            (getToken as jest.Mock).mockReturnValue(accessToken);
            (TokenService.insertTokenInstance as jest.Mock).mockResolvedValue(true);

            req.body = { email: 'test@example.com', fromProfile: false };

            await AuthController.sentCodeToEmail(req as Request, res as Response);

            expect(AuthService.sendVerification).toHaveBeenCalledWith('test@example.com');
            expect(TokenService.insertTokenInstance).toHaveBeenCalledWith(accessToken, 1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                code: 1,
                message: 'Check email, code is valid for 3 min',
                data: { accessToken }
            });
        });

        it('should send verification code if fromProfile is true', async () => {
            const user = { id: 1, email: 'test@example.com' };

            (AuthService.findByEmail as jest.Mock).mockResolvedValue(user);
            (AuthService.sendVerification as jest.Mock).mockResolvedValue(true);

            req.body = { email: 'test@example.com', fromProfile: true };

            await AuthController.sentCodeToEmail(req as Request, res as Response);

            expect(AuthService.sendVerification).toHaveBeenCalledWith('test@example.com');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ code: 1, message: 'Check email, code is valid for 3 min' });
        });
    });

    describe('verifyCode', () => {
        it('should return 400 if user is not present in request', async () => {
            req.body = { code: '123456' };

            await AuthController.verifyCode(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ code: 2, error: 'Invalid email' });
        });

        it('should return 400 if verification code has expired', async () => {
            const user = { email: 'test@example.com', code: '123456', code_expire: new Date(Date.now() - 1000) };

            (req as any).user = user;
            req.body = { code: '123456' };

            await AuthController.verifyCode(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ code: 3, error: 'Verification code has expired' });
        });

        it('should return 400 if code is incorrect', async () => {
            const user = { email: 'test@example.com', code: '123456', code_expire: new Date(Date.now() + 1000) };

            (req as any).user = user;
            req.body = { code: '654321' };

            await AuthController.verifyCode(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ code: 2, error: 'Incorrect code' });
        });

        it('should verify code and return success', async () => {
            const user = { email: 'test@example.com', code: '123456', code_expire: new Date(Date.now() + 1000) };

            (req as any).user = user;
            req.body = { code: '123456' };

            (AuthService.clearCodeColumn as jest.Mock).mockResolvedValue(true);

            await AuthController.verifyCode(req as Request, res as Response);

            expect(AuthService.clearCodeColumn).toHaveBeenCalledWith('test@example.com');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ code: 1, message: 'Success' });
        });
    });

    describe('passwordRecover', () => {
        it('should return 400 if verification is not valid', async () => {
            const user = { email: 'test@example.com', code: '123456' };

            (req as any).user = user;
            req.body = { password: 'newpassword123' };

            await AuthController.passwordRecover(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ code: 2, error: 'Invalid verification' });
        });

        it('should change the password successfully', async () => {
            const user = { email: 'test@example.com', code: null };
            const hashedPassword = 'hashednewpassword';

            (req as any).user = user;
            req.body = { password: 'newpassword123' };

            (hashPassword as jest.Mock).mockReturnValue(hashedPassword);
            (AuthService.changePassword as jest.Mock).mockResolvedValue(true);

            await AuthController.passwordRecover(req as Request, res as Response);

            expect(AuthService.changePassword).toHaveBeenCalledWith('test@example.com', hashedPassword);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ code: 1, message: 'Successfully changed' });
        });
    });

});

