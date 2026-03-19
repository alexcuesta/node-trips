const filterTripsByDestination = (trips, destination) => {
    if (!destination) return trips
    return trips.filter(t => { return t.destination === destination})
}

const sortTrips = (trips, sortField) => {
    if (!sortField) return trips
    return trips.sort((a, b) => {

        if (typeof a[sortField] === 'string') {
            return a[sortField].localeCompare(b[sortField])
        }

        return a[sortField] - b[sortField]
    })
}

const mapView = (trips, view) => {
    if (view !== 'summary') return trips 
    return trips.map(({destination, price}) => ({destination,price}))
}
    


module.exports = { filterTripsByDestination, sortTrips, mapView}