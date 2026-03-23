const { fetchTrips } = require('./tripsAdapter')

const fetchTrips = async () => {
    const trips = await fetchTrips()

    const filtered = filterTripsByDestination(trips, req.query['destination'])
    const page = paginateTrips(filtered, req.query['limit'], req.query['offset'])
    const sorted = sortTrips(page, req.query['sort'])
    const mappedView = mapView(sorted, req.query['view'])

    return mappedView
}