# Curtin URL Shortener

A simple, fast, and modern URL shortener service built with Node.js, Fastify, MongoDB, and Redis.

## Table of Contents
- [Overview](#overview)
- [How to Run](#how-to-run)
- [Environment Variables Configuration](#environment-variables-configuration)
- [How to Use the API](#how-to-use-the-api)
- [Project Structure](#project-structure)

---

## Overview

> ⚠️ **Note:** This project currently includes only the backend. The frontend is still under development.

This project is a URL shortening service. It allows you to generate short links for long URLs and automatically redirects when accessing the short link.

- **Backend:** Node.js + Fastify
- **Database:** MongoDB
- **Cache:** Redis (to speed up redirects)
- **Testing:** Vitest

---

## How to Run

### Using Docker Compose (Recommended)

1. **Set up environment variables** (see below).
2. In the project root, run:

```sh
docker-compose -f backend/docker-compose.yml up --build
```

The service will be available on the port defined by the `PORT` variable (default: 3333).

### Development Environment with Docker Compose

If you want to run only the database services (MongoDB and Redis) via Docker, and the backend in development mode (hot reload), use the `docker-compose.dev.yml` file:

1. **Set up environment variables** (see below).
2. Start MongoDB and Redis:
   ```sh
   docker-compose -f backend/docker-compose.dev.yml up
   ```
3. In another terminal, start the backend in development mode:
   ```sh
   cd backend
   npm install
   npm run dev
   ```

This way, you can edit the code and see changes in real time while the databases run in containers.

### Running Manually (Node.js)

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Set up environment variables (see below).
3. Make sure MongoDB and Redis are running locally.
4. Start the server in development mode:
   ```sh
   npm run dev
   ```

---

## Environment Variables Configuration

Create a `.env` file in the `backend` folder with the following content (example):

```
PORT=3333
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB_NAME=curtin
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## How to Use the API

### 1. Create a Shortened URL

- **Endpoint:** `POST /url`
- **Body:**
  ```json
  {
    "url": "https://example.com/some-long-url"
  }
  ```
- **Response:**
  ```json
  {
    "code": "abc123"
  }
  ```

### 2. Redirect to the Original URL

- **Endpoint:** `GET /:code`
- **Example:** `GET /abc123`
- **Response:** Redirects (HTTP 307) to the original URL.

---

## Project Structure

```
backend/
  src/
    http/controllers/url/  # URL routes and controllers
    models/                # MongoDB models
    repositories/          # Repositories (Mongo, Redis, InMemory)
    use-cases/             # Use cases (business logic)
    utils/                 # Utilities (e.g., URL hash)
    database/              # MongoDB connection
    shared/                # Shared resources (e.g., Redis cache)
  Dockerfile
  docker-compose.yml
  package.json
```

---

## Notes
- Shortened URLs expire in 5 days.
- Redis cache is used to speed up redirection.
- The project includes unit and integration tests (Vitest). 