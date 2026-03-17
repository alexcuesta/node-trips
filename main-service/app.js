import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3000

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


app.listen(port, () => {
    console.log(`Main app listening on port ${port}`)
})