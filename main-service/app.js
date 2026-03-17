const express = require('express')
const axios =  require('axios')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

const myApiKey = process.env.API_KEY

app.get("/trips", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:3333/mock/trips", {
                headers: {
                    "x-api-key": myApiKey
                }
            })
        console.log("Response from mock:" + JSON.stringify(response.data))
        res.json(response.data)
    } catch(error) {
        if (error.response) {
            console.log("Error response: ${error.response.data}")
            res.status(error.response.status).json(error.response.data)
        } else {
            console.log("Generic error from mock: " + error)
            res.send("Generic error: " + error)
        }
    } finally {
        console.log("Finalising axios call")
    }
})


module.exports = app