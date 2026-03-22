const axios =  require('axios')
const { ServiceUnavailableError, ServiceTimeoutError } = require ('./tripsErrors')


const fetchTrips = async (apiKey, tripsHost) => {
    try {
        const response = await axios.get(`${tripsHost}/mock/trips`, {
                headers: {
                    "x-api-key": apiKey
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
        console.log("Finalising axios call")
    }
}

module.exports = { fetchTrips }