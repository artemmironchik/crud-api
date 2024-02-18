# CRUD-API

## Description

Simple CRUD API using in-memory database underneath.

## Technologies

- Node.js

## Installation

1. Clone the repository
2. Install the required dependencies by running `npm i`
3. Create `.env` file with these fields:
`PORT=4000`
`NODE_ENV=development`

## Usage

1. To start the server run one of the following commands:

- Development mode: `npm run start:dev`
- Production mode: `npm run start:prod`

2. Access the API endpoints using a tool like Postman or cURL.

3. Run tests by running this command: `npm run test`

## API Endpoints

- `GET /api/users`: Get all users.
- `GET /api/users/:id`: Get user by id.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update user.
- `DELETE /api/users/:id`: Delete user.
