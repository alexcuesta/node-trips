# Description

HTTP service that consumes an external API and exposes a simplified endpoint

# Project Structure

node-trips/
│
├── package.json
├── server.js            # Entry point (or app.js)
├── routes/              # Route handlers (e.g., trips.js)
├── controllers/         # Business logic (optional for small projects)
├── services/            # External API calls (optional)
├── middlewares/         # Custom middleware (optional)
├── utils/               # Utility functions (optional)
├── tests/               # Test files
├── SPECIFICATION.md
├── PLAN.md
└── README.md