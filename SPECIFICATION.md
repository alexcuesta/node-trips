# Practice exercise, Travel Deals API

You must build a small HTTP service that consumes an external API and exposes a simplified endpoint.

Assume the external API returns this:

```json
[
  { "id": 1, "destination": "Paris", "price": 120, "duration": 3 },
  { "id": 2, "destination": "London", "price": 150, "duration": 2 },
  { "id": 3, "destination": "Paris", "price": 90, "duration": 4 },
  { "id": 4, "destination": "Berlin", "price": 80, "duration": 2 }
]
```

External API

```
GET https://api.example.com/trips
```

## Task 1 (10 min)

Create an endpoint:

```
GET /trips
```

Your service should:

1. call the external API using an api-key
2. return the same data

Example response:
```json
[
  { 
    "id": 1, 
    "destination": "Paris", 
    "price": 120, 
    "duration": 3 
  }
]
```


## Task 2 (10 min)

Add filtering by destination.

Example:
```
GET /trips?destination=Paris
```

Response:
```
[
  { "id": 1, "destination": "Paris", "price": 120, "duration": 3 },
  { "id": 3, "destination": "Paris", "price": 90, "duration": 4 }
]
```