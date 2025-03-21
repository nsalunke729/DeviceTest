# Device Atlas - React + Express + PostgreSQL + Docker

## Overview
This project is a full-stack application using:
- **Frontend**: React with Bootstrap for UI components
- **Backend**: Express.js (Node.js framework)
- **Database**: PostgreSQL
- **Containerization**: Docker (with separate containers for frontend, backend, and database)

## Prerequisites
Make sure you have the following installed:
- **Docker & Docker Compose**
- **Node.js** (if running locally)
- **PostgreSQL** (if running locally)

## Environment Variables
Create a `.env` file in both frontend and backend directories.

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000
```

### Backend `.env`
```
PORT=5000
DB_HOST=db
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

## Docker Setup
### 1. Build and Start Containers
Run the following command to build and start all services:
```
docker-compose up --build
```

### 2. Stop Containers
To stop running containers:
```
docker-compose down
```

## API Endpoints
### Backend Routes
- **`GET /tablets`** - Fetch stored tablet data
- **`GET /all`** - Fetch all device records
- **`GET /fetch-devices`** - Add records to the database

## Running Locally (Without Docker)
### Backend
1. Install dependencies: `cd backend && npm install`
2. Start the server: `npm start`

### Frontend
1. Install dependencies: `cd frontend && npm install`
2. Start React: `npm start`

## Database Setup (PostgreSQL)
- If running locally, ensure PostgreSQL is installed and running.
- If using Docker, a PostgreSQL container will be created automatically.

## License
This project is licensed under the MIT License.

