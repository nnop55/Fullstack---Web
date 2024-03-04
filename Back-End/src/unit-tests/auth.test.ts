import { AuthController } from '../controllers/auth-controller';
import { Request, Response } from 'express';




jest.mock('../repositories/auth-repository.ts', () => {
    class MockAuthRepository {
        async findByEmail(email: string) {
            if (email === 'valid@example.com') {
                return { id: 1, email: 'valid@example.com', password: 'hashedPassword' }
            } else {
                return null;
            }
        }
    }

    return { AuthRepository: MockAuthRepository };
});

jest.mock('../repositories/token-repository.ts', () => {
    class MockTokenRepository {
        public static async tokenInstance(email: string): Promise<string | null> {
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
});
