# node-trips

## Description

A Node.js HTTP service that consumes an external trips API (mocked) and exposes a simplified, unified endpoint for querying trip data.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**

   Create a `.env` file in the root of the project:
   ```bash
   cp .env.example .env
   ```

   Set your API key in the `.env` file:
   ```env
   API_KEY=your_api_key_here
   ```

## Usage

**Start the server:**
```bash
npm start
```

**Query the trips endpoint:**
```bash
curl -H "x-api-key: your_api_key_here" http://localhost:3000/trips
```

**With query parameters:**
```bash
curl -H "x-api-key: your_api_key_here" "http://localhost:3000/trips?origin=SYD&destination=GRU"
```

## Development

**Run in development mode (with hot reload):**
```bash
npm run dev
```

**Run tests:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm run test:watch
```