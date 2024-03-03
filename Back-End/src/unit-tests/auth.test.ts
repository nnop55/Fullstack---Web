import { AuthController } from '../controllers/auth-controller';
import { Request, Response } from 'express';

describe('AuthController', () => {
    let authController: AuthController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<any>;
    beforeEach(() => {
        authController = new AuthController();
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

    });
});
