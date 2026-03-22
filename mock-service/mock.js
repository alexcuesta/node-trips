const express = require('express')
const app = express()
const port = 3333

const API_KEY = "secret"
let callsCounter = 0

app.get("/mock/trips", async (req, res) => {
    callsCounter++
    console.log(`Mock trips called ${callsCounter}`)

    const apiKey = req.headers['x-api-key']
    if (apiKey !== API_KEY) {
        console.log("Provided api key is invalid ${apiKey}")
        return res.status(401).json({ error: 'Unauthorized'})
    }

    // delay
    const delay = 0
    await new Promise(resolve => setTimeout(resolve, delay))

    const mockTrips = [
        { "id": 1, "destination": "Paris", "price": 120, "duration": 3 },
        { "id": 2, "destination": "London", "price": 150, "duration": 2 },
        { "id": 3, "destination": "Paris", "price": 90, "duration": 4 },
        { "id": 4, "destination": "Berlin", "price": 80, "duration": 2 }
    ]
    res.json(mockTrips)
})

app.listen(port, () => {
    console.log(`Mock Service listening on port ${port}`)
})

