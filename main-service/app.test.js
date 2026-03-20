const request = require('supertest')
const nock = require('nock')
const app = require('./app.js')


describe('Get /trips', () => {
    beforeEach(() => {
        nock('http://localhost:3333')
            .get('/mock/trips')
            .times(2)
            .reply(200, [
                { "id": 1, "destination": "Madrid", "price": 100, "duration": 6 },
                { "id": 2, "destination": "Oviedo", "price": 50, "duration": 8 },
                { "id": 3, "destination": "Zaragoza", "price": 90, "duration": 3 },
                { "id": 4, "destination": "Sevilla", "price": 80, "duration": 9 }
            ])
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it('should return all trips', async () => {

        const response = await request(app).get('/trips')
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual([
                { "id": 1, "destination": "Madrid", "price": 100, "duration": 6 },
                { "id": 2, "destination": "Oviedo", "price": 50, "duration": 8 },
                { "id": 3, "destination": "Zaragoza", "price": 90, "duration": 3 },
                { "id": 4, "destination": "Sevilla", "price": 80, "duration": 9 }
            ])
    })

    it('should return trips filtered by destination', async () => {
        const response = await request(app).get('/trips?destination=Oviedo')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([
            { "id": 2, "destination": "Oviedo", "price": 50, "duration": 8 }
        ])
    })

    it.each([
        ['price', [
            { "id": 2, "destination": "Oviedo", "price": 50, "duration": 8 },
            { "id": 4, "destination": "Sevilla", "price": 80, "duration": 9 },
            { "id": 3, "destination": "Zaragoza", "price": 90, "duration": 3 },
            { "id": 1, "destination": "Madrid", "price": 100, "duration": 6 }
        ]],
        ['duration', [
            { "id": 3, "destination": "Zaragoza", "price": 90, "duration": 3 },
            { "id": 1, "destination": "Madrid", "price": 100, "duration": 6 },
            { "id": 2, "destination": "Oviedo", "price": 50, "duration": 8 },
            { "id": 4, "destination": "Sevilla", "price": 80, "duration": 9 }
        ]]

    ])('should return trips sorted by %s', async (sortField, expectedBody) => {
        const response = await request(app).get(`/trips?sort=${sortField}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expectedBody)
    })

    it('should return summary of trips', async () => {
        const response = await request(app).get('/trips?view=summary')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([
                { "destination": "Madrid", "price": 100 },
                { "destination": "Oviedo", "price": 50 },
                { "destination": "Zaragoza", "price": 90},
                { "destination": "Sevilla", "price": 80}

        ])
    })

    it.each([
        [0, 2, [{ "id": 1, "destination": "Madrid", "price": 100, "duration": 6 },
                { "id": 2, "destination": "Oviedo", "price": 50, "duration": 8 }]
        ],
        [2, 2, [{ "id": 3, "destination": "Zaragoza", "price": 90, "duration": 3 },
                { "id": 4, "destination": "Sevilla", "price": 80, "duration": 9 }]
        ],
        [1, 3, [{ "id": 2, "destination": "Oviedo", "price": 50, "duration": 8 },
                { "id": 3, "destination": "Zaragoza", "price": 90, "duration": 3 },
                { "id": 4, "destination": "Sevilla", "price": 80, "duration": 9 }]
        ],
        [3, 10, [{ "id": 4, "destination": "Sevilla", "price": 80, "duration": 9 }]
        ]
    ])('should returned trips by pages with offset=%i and limit=%i', async (offset, limit, expected) => {
        const response = await request(app).get(`/trips?limit=${limit}&offset=${offset}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expected)
    })

})
