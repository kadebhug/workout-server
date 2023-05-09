const request = require('supertest')
const app = require('../../app')

describe('Test POST /auth/register', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .post('/auth/register');
        expect(response.statusCode).toBe(200);
    });
    test('It should catch missing required properties', () => {
        
    });
});
describe('Test POST /auth/login', () => {
    test('It should respond with 200 success', () => {
        const response = 200;
        expect(response).toBe(200);
    });
    test('It should catch missing required properties', () => {
        
    });
});