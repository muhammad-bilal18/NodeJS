const request = require('supertest');
const createServer = require('../../../start/createServer');
const connect = require('../../../start/db');
const mongoose = require('mongoose');
const { Genre } = require('../../../models/genre');

describe('GET /', () => {
    let app;
    beforeAll(() => {
        connect();
        app = createServer();
    })

    it('should return all genres', async () => {
        const response = await request(app).get('/api/genres');
        expect(response.statusCode).toBe(200);
    });

    afterEach(async() => {
        await Genre.deleteMany({});
    })
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    })
});