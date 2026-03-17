const request = require('supertest')
const nock = require('nock')
const app = require('./app.js')


describe('Get /trips', () => {
    beforeAll(() => {
        console.log("Before all tests")
    })

    it('should return trips from mock', async () => {

        nock('http://localhost:3333')
            .get('/mock/trips')
            .reply(200, [
                { "id": 1, "destination": "Madrid", "price": 100, "duration": 3 },
                { "id": 2, "destination": "Oviedo", "price": 50, "duration": 2 }
            ])

        const response = await request(app).get('/trips')
        
        expect(response.status).toBe(200)
    })
})
