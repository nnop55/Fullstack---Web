import { AuthController } from '../controllers/auth-controller';
import { Request, Response } from 'express';

class MockAuthRepository {
    async findByEmail(email: string) {
        if (email === 'valid@example.com') {
            return { id: 1, email: 'valid@example.com', password: 'hashedPassword' }
        } else {
            return null;
        }
    }

}

class MockTokenRepository {
    async tokenInstance(email: string) {
        if (email === 'valid@example.com') {
            return 'mockAccessToken'
        } else {
            return null;
        }
    }

}

const bcrypt = {
    compareSync: jest.fn(() => true)
};

describe('AuthController', () => {
    let authController: AuthController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<any>;
    let mockAuthRepository: MockAuthRepository;
    let mockTokenRepository: MockTokenRepository;

    beforeEach(() => {
        mockAuthRepository = new MockAuthRepository()
        mockTokenRepository = new MockTokenRepository()
        authController = new AuthController(mockAuthRepository as any, mockTokenRepository as any, bcrypt as any);
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
        });
    });
});
