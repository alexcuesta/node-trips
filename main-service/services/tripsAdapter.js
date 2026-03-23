const axios =  require('axios')
const { ServiceUnavailableError, ServiceTimeoutError } = require ('./tripsErrors')

const dotenv = require('dotenv')
dotenv.config()

const MY_API_KEY = process.env.API_KEY // we can validate using 'envalid' dependency
console.log(`api key: ${MY_API_KEY}`)
const EXTERNAL_HOST = process.env.EXTERNAL_HOST ?? 'http://localhost:3333'

const fetchTrips = async () => {
    try {
        console.log(`api key: ${MY_API_KEY}`)
        const response = await axios.get(`${EXTERNAL_HOST}/mock/trips`, {
                headers: {
                    "x-api-key": MY_API_KEY
                },
                timeout: 1000
            })
        return response.data

    } catch(error) {
        console.log("Generic error from external service: " + error)

        switch(error.code) {
            case 'ECONNREFUSED': 
                throw new ServiceUnavailableError()
            case 'ECONNABORTED':
                throw new ServiceTimeoutError()
            default:
                console.error(`Unexpected error: ${error.code}`)
                throw error
        }
        
    } finally {
        console.log("Finalising axios call 1")
    }
}

module.exports = { fetchTrips }