import { AuthController } from '../controllers/auth-controller';
import { Request, Response } from 'express';




jest.mock('../repositories/auth-repository.ts', () => {
    class MockAuthRepository {
        async findByEmail(email: string) {
            if (email === 'valid@example.com') {
                return { id: 1, email: 'valid@example.com', password: 'hashedPassword', code: '123456' }
            } else {
                return null;
            }
        }

        async insertUser(email: string, fullName: string, hashedPassword: String) {
            Promise.resolve()
        }

        async sendVerification(email: string) {
            Promise.resolve()
        }

        async changePassword(email: string, hashedPassword: string) {
            Promise.resolve()
        }

        async clearCodeColumn(email: string) {
            Promise.resolve()
        }
    }

    return { AuthRepository: MockAuthRepository };
});

jest.mock('../repositories/token-repository.ts', () => {
    class MockTokenRepository {
        public static async insertTokenInstance(email: string): Promise<string | null> {
            if (email === 'valid@example.com') {
                return 'mockAccessToken';
            } else {
                return null;
            }
        }
    }

    return { TokenRepository: MockTokenRepository };
});

jest.mock('../middleware/token.middleware.ts', () => ({
    getToken: jest.fn().mockReturnValue('mockAccessToken')
}));

jest.mock('../services/mailer-service.ts', () => ({
    sentMail: jest.fn().mockResolvedValue(Promise.resolve())
}));

const bcrypt = {
    compareSync: jest.fn(() => true),
    hashSync: (jest.fn(() => true) as any)
};

describe('AuthController', () => {
    let authController: AuthController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<any>;

    beforeEach(() => {
        authController = new AuthController(bcrypt);
        mockRequest = { body: {} };
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        };
    });

    describe('login', () => {
        it('should respond with status 400 if email or password is invalid', async () => {
            mockRequest.body = { email: 'invalid@example.com', password: 'invalidPassword' };

            await authController.login(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
        });

        it('should respond with access token if email and password are valid', async () => {
            mockRequest.body = { email: 'valid@example.com', password: 'validPassword' };

            await authController.login(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({ accessToken: 'mockAccessToken' });
        });
    });

    describe('register', () => {
        it('should respond with status 409 if user already exist', async () => {
            mockRequest.body = { email: 'valid@example.com', password: 'invalidPassword' };

            await authController.register(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(409);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User already registered with this email' });
        });

        it('should respond with status 201 if user registered', async () => {
            mockRequest.body = { email: 'newUser@example.com', password: 'validPassword' };

            await authController.register(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
        });
    });

    describe('send code to email', () => {
        it('should respond with status 400 if invalid email', async () => {
            mockRequest.body = { email: 'invalid@example.com', password: 'invalidPassword' };

            await authController.sentCodeToEmail(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid email' });
        });

        it('should respond with status 200 if valid email', async () => {
            mockRequest.body = { email: 'valid@example.com', password: 'validPassword' };

            await authController.sentCodeToEmail(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Check email, code is valid for 3 min' });
        });
    });

    describe('verify code', () => {
        it('should respond with status 400 if invalid email', async () => {
            mockRequest.body = { email: 'invalid@example.com', password: 'invalidPassword', code: '123456' };

            await authController.verifyCode(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid email' });
        });

        it('should respond with status 400 if invalid code', async () => {
            mockRequest.body = { email: 'valid@example.com', password: 'invalidPassword', code: 'invalidCode' };

            await authController.verifyCode(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Incorrect code' });
        });

        it('should respond with status 200 if valid properties', async () => {
            mockRequest.body = { email: 'valid@example.com', password: 'validPassword', code: '123456' };

            await authController.verifyCode(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Success' });
        });
    });

    describe('password recover', () => {
        it('should respond with status 200', async () => {
            mockRequest.body = { email: 'valid@example.com', password: 'validPassword' };

            await authController.passwordRecover(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Successfully changed' });
        });
    });
});
