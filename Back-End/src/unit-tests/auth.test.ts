// import { Auth } from "../controllers/auth";
// import { Request, Response } from "express";


// describe("GET /api/product/get", () => {
//     it("should return all products", async () => {
//         return request(app)
//             .get("/api/product/get")
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((res) => {
//                 expect(res.statusCode).toBe(200);
//             })
//     });
// });

// // Mock dependencies
// const mockReq = {
//     body: {},
//     session: {}
// } as unknown as Request;

// const mockRes = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn()
// } as unknown as Response;

// const mockDb = {
//     setQuery: jest.fn()
// } as any;

// const mockBcrypt = {
//     compareSync: jest.fn()
// } as any;

// const mockToken = {
//     accessToken: jest.fn()
// } as any;

// // Mock successful login data
// const mockResult = [{ id: 1, email: 'test@example.com', password: 'hashed_password' }];

// // Mock the Auth class
// jest.mock("../controllers/auth");

// // describe('Login Method', () => {
// //     test('should return access token for valid credentials', async () => {
// //         mockReq.body = { email: 'test@example.com', password: 'password' };
// //         mockDb.setQuery.mockImplementationOnce((sql: string, params: any[], callback: Function) => {
// //             callback(null, mockResult);
// //         });
// //         mockBcrypt.compareSync.mockReturnValueOnce(true);
// //         mockToken.accessToken.mockReturnValueOnce('dummy_access_token');

// //         const auth = new Auth(mockToken, mockDb);
// //         await auth.login(mockReq, mockRes);

// //         expect(mockRes.status).toHaveBeenCalledWith(201);
// //         expect(mockRes.json).toHaveBeenCalledWith({ accessToken: 'dummy_access_token' });
// //     });

// //     test('should return 401 error for missing email or password', async () => {
// //         mockReq.body = { password: 'password' };

// //         const auth = new Auth(mockToken, mockDb);
// //         await auth.login(mockReq, mockRes);

// //         expect(mockRes.status).toHaveBeenCalledWith(401);
// //         expect(mockRes.json).toHaveBeenCalledWith({ error: 'Email and password are required' });
// //     });

// //     // Add more test cases for other scenarios
// // });


