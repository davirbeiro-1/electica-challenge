# Ticket Management API

## Description

This API was developed to manage ticket data, specifically addressing the need to sort tickets by departure time. The API provides endpoints for creating and retrieving ticket information, with a focus on enabling users to organize their travel itineraries efficiently.

## Motivation

The primary motivation for this API is to solve the problem of organizing a collection of tickets. Specifically:

- **Problem:** The client needs a way to sort tickets by their departure time. This is crucial for users to effectively plan and manage their trips, ensuring they arrive at their final destination on time.

- **Solution:** This API provides a mechanism to receive an array of tickets and sort them according to departure time, enabling the user to organize their itinerary.

However, the API was expanded beyond the initial requirement to offer more comprehensive ticket management:

- Instead of only sorting, the API now also persists tickets in a database. This allows users to reuse ticket information in the future, providing added convenience and practicality.

## Key Features

The API provides the following main functionalities:

1.  **Ticket Creation:**

    - Endpoint: `POST /tickets`
    - Functionality: Receives an array of ticket objects and saves them into a database. This allows for future retrieval and reuse of ticket data.
    - Input: An array of ticket objects (see `CreateTicketDTO` for details).
    - Output: An array of created ticket objects.

2.  **Itinerary Creation and Sorting:**

    - Endpoint: `POST /itinerary`
    - Functionality: Receives an array of ticket objects, saves them to the database, and returns the tickets sorted by `departureTime`.
    - Input: An array of ticket objects (same as `POST /tickets`).
    - Output: An array of ticket objects, sorted by `departureTime`.

## Technologies Used

- Node.js
- NestJS
- PostgreSQL
- Prisma
- Swagger
- Docker

## Installation

1.  **Clone the repository:**
    Clone the repo

2.  **Set up the database using Docker (Recommended):**

    - Ensure you have Docker installed.
    - A `docker-compose.yml` file is already included in the project.
    - You need to set the environment variable `DB_PASSWORD` in your system or in a `.env` file.
    - Run Docker Compose to start the database:

      ```bash
      docker-compose up -d db
      ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

5.  **Start the application using Docker (Recommended):**

    ```bash
    docker-compose up --build app
    ```

    Or, if you prefer to run the application without Docker:

    ```bash
    npm run start:dev

    ```

6.  **Populate the database with seed data (Optional):**

    npm run seed

    Or, you can still our ticket POST to add specific destinations

## Usage

The API documentation is available at `http://localhost:3000/docs`, where you can check the necessary schemas to sucessufly run the application
