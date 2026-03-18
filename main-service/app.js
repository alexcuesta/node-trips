const express = require('express')
const axios =  require('axios')
const dotenv = require('dotenv')
const {filterTripsByDestination, sortTrips} = require('./helpers')
dotenv.config()

const app = express()

const MY_API_KEY = process.env.API_KEY
const EXTERNAL_HOST = process.env.EXTERNAL_HOST

app.get("/trips", async (req, res) => {
    try {
        const response = await axios.get(`${EXTERNAL_HOST}/mock/trips`, {
                headers: {
                    "x-api-key": MY_API_KEY
                }
            })

        const trips = response.data
        const filtered = filterTripsByDestination(trips, req.query['destination'])
        const sorted = sortTrips(filtered, req.query['sort'])
        res.json(sorted)
        
    } catch(error) {
        if (error.response) {
            console.log(`Error response: ${error.response.data}`)
            res.status(500).status(error.response.status).json(error.response.data)
        } else {
            console.log("Generic error from mock: " + error)
            res.status(500).send("Generic error: " + error)
        }
    } finally {
        console.log("Finalising axios call")
    }
})


module.exports = app