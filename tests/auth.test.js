const supertest = require('supertest');
const app = require('../index');
const faker = require('faker');
const mongoose = require('mongoose');

afterAll(async () => {
    await mongoose.disconnect()
    app.close()
})

describe('User Authentication Endpoints', () => {

    const mockUser = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    it('should register a new user successfully', async () => {
        const response = await supertest(app)
        .post('/users/register')
        .send(mockUser)
        .expect(201);
    });

    it('should return 400 with missing email during registration', async () => {
        const response = await supertest(app).post('/users/register').send({
            name: mockUser.name,
            password: mockUser.password
        }).expect(400);
    });

    it('should login with correct credentials', async () => {
        const response = await supertest(app).post('/users/login').send({
            email: mockUser.email,
            password: mockUser.password
        })
        .expect('Content-Type', /json/)
        .expect((res) => {
            expect(res.body).toHaveProperty('token');
        });
    });

    it('should return 401 with wrong password during login', async () => {
        const response = await supertest(app).post('/users/login').send({
            email: mockUser.email,
            password: 'wrongpassword'
        }).expect(401);
    });
});