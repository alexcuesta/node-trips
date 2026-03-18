const request = require('supertest')
const nock = require('nock')
const app = require('./app.js')


describe('Get /trips', () => {
    beforeEach(() => {
        nock('http://localhost:3333')
            .get('/mock/trips')
            .reply(200, [
                { "id": 1, "destination": "Madrid", "price": 100, "duration": 3 },
                { "id": 2, "destination": "Oviedo", "price": 50, "duration": 2 }
            ])
    })

    afterAll(() => {
        nock.cleanAll()
    })

    it('should return all trips', async () => {

        const response = await request(app).get('/trips')
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual([
                { "id": 1, "destination": "Madrid", "price": 100, "duration": 3 },
                { "id": 2, "destination": "Oviedo", "price": 50, "duration": 2 }
            ])
    })

    it('should return trips filtered by destination', async () => {
        const response = await request(app).get('/trips?destination=Oviedo')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([
            { "id": 2, "destination": "Oviedo", "price": 50, "duration": 2 }
        ])
    })

    it('should return trips sorted by price', async () => {
        const response = await request(app).get('/trips?sort=price')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([
            { "id": 2, "destination": "Oviedo", "price": 50, "duration": 2 },    
            { "id": 1, "destination": "Madrid", "price": 100, "duration": 3 }
        ])

    })

})
