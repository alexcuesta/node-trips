const express = require('express')

const {filterTripsByDestination, sortTrips, mapView, paginateTrips} = require('./helpers')
const { fetchTrips } = require('./services/tripsService')
const { ServiceUnavailableError, ServiceTimeoutError } = require('./services/tripsErrors')

const app = express()

app.get("/trips", async (req, res) => {
    try {
        const trips = await fetchTrips()
        res.json(trips)
        
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