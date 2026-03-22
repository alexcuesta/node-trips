class ServiceTimeoutError extends Error {
    constructor() {
        super("External service timed out")
        this.name = "ServiceTimeoutError"
    }
}

class ServiceUnavailableError extends Error {
    constructor() {
        super("External service is not available")
        this.name = "ServiceUnavilableError"
    }
}

module.exports = {ServiceTimeoutError, ServiceUnavailableError}