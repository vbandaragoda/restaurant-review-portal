# TasteLanka Restaurant Review Portal

TasteLanka is a multilingual restaurant discovery and review portal for Colombo, Kandy and Galle. The first implemented vertical slice is the responsive Figma home page plus a Spring Boot REST foundation for restaurants and JWT authentication.

## Architecture

```text
Next.js 16 + TypeScript + Tailwind CSS + Axios
                      ↓ REST / JSON
Spring Boot 4.1 + Spring Security + JWT
                      ↓ JPA / Hibernate
                MySQL 8.4 (utf8mb4)
```

## Prerequisites

- Node.js 20.9 or newer and npm
- JDK 17 or newer (the included Maven wrapper downloads Maven)
- Docker Desktop, or a local MySQL 8 instance

## Run locally

1. Copy `.env.example` to `.env` and change the development secrets.
2. Start MySQL: `docker compose up -d mysql`
3. Start the API: `cd backend` then `./mvnw spring-boot:run` (Windows: `mvnw.cmd spring-boot:run`).
4. Start the UI: `cd frontend`, run `npm install`, then `npm run dev`.
5. Open `http://localhost:3000`.

The API defaults to `http://localhost:8080/api/v1`. Override it with `NEXT_PUBLIC_API_URL`.

## Initial REST endpoints

- `GET /api/v1/health`
- `GET /api/v1/restaurants`
- `GET /api/v1/restaurants/top-rated`
- `GET /api/v1/restaurants/{slug}`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

## Unicode and localization

The MySQL server, database, tables, API encoding and frontend fonts are configured for English, Sinhala and Tamil. MySQL uses `utf8mb4` with `utf8mb4_0900_ai_ci`; Connector/J derives UTF-8 from the server configuration rather than relying on legacy `utf8` settings.

## Project layout

```text
frontend/   Next.js application
backend/    Spring Boot REST API
database/   Versioned MySQL schema and seed data
docs/       Project records
```
