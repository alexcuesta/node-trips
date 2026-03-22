const express = require('express')

const {filterTripsByDestination, sortTrips, mapView, paginateTrips} = require('./helpers')
const { fetchTrips } = require('./services/tripsService')
const { ServiceUnavailableError, ServiceTimeoutError } = require('./services/tripsErrors')

const dotenv = require('dotenv')
dotenv.config()

const app = express()

const MY_API_KEY = process.env.API_KEY // we can validate using 'envalid' dependency
const EXTERNAL_HOST = process.env.EXTERNAL_HOST ?? 'http://localhost:3333'

app.get("/trips", async (req, res) => {
    try {
        const trips = await fetchTrips(MY_API_KEY, EXTERNAL_HOST)

        const filtered = filterTripsByDestination(trips, req.query['destination'])
        const page = paginateTrips(filtered, req.query['limit'], req.query['offset'])
        const sorted = sortTrips(page, req.query['sort'])
        const mappedView = mapView(sorted, req.query['view'])

        res.json(mappedView)
        
    } catch(error) {
        if (error instanceof ServiceUnavailableError) {
            res.status(503).json(error.message) // Service unavailable
        } 
        if (error instanceof ServiceTimeoutError) {
            res.status(504).json(error.message) // Service timed out
        } 
        res.status(500).send("Unexpected error: " + error)
    } 
})


module.exports = app