const supertest = require('supertest');
const app = require('../index');
const faker = require('faker');
const mongoose = require('mongoose');

afterAll(async () => {
    await mongoose.disconnect()
    app.close()
})

describe('Event Tests', () => {
    let authToken;
    let createdEvent

    beforeAll(async () => {
        const loginResponse = await supertest(app)
            .post('/users/login')
            .send({
                "email": "shubham@superman.com",
                "password": "Krypt()n8"
            });
        authToken = loginResponse.body.token;
    });

    const mockEvent = {
        title: faker.lorem.words(),
        date: faker.date.future().toISOString().split('T')[0],
        time: faker.time.recent().toString(),
        description: faker.lorem.sentence()
    };

    it('without token should give unauthorized error', async () => {
        const response = await supertest(app)
            .post('/events')
            .send(mockEvent)
            .expect(401);
    });

    it('should create a new event successfully', async () => {
        const response = await supertest(app)
            .post('/events')
            .set('Authorization', `Bearer ${authToken}`)
            .send(mockEvent)
            .expect(201);
        createdEvent = response.body
    });

    it('should get an existing event successfully', async () => {
        const response = await supertest(app)
            .get(`/events/${createdEvent._id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);
        expect(response.body).toBeDefined();
        expect(response.body.title).toBe(mockEvent.title);
    });

    it('should update an existing event successfully', async () => {
        const updatedEventData = { ...mockEvent, description: 'Updated description' };
        const response = await supertest(app)
            .put(`/events/${createdEvent._id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updatedEventData)
            .expect(200);
        expect(response.body).toBeDefined();
        expect(response.body.description).toBe(updatedEventData.description);
    });

    it('should register a user for an event successfully', async () => {
        const response = await supertest(app)
            .post(`/events/${createdEvent._id}/register`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe('User registered for event successfully');
    });

    it('should delete an existing event successfully', async () => {
        const response = await supertest(app)
            .delete(`/events/${createdEvent._id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe('Event deleted successfully');
    });
});