# TasteLanka Restaurant Review Portal

TasteLanka is a multilingual restaurant discovery and review portal for Colombo, Kandy and Galle. It includes responsive customer journeys, JWT authentication, moderated reviews, saved restaurants, and administration workflows for restaurants and menus.

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

1. Copy `.env.example` to `.env` and change the development secrets. Docker Compose reads this file for MySQL.
2. Start MySQL: `docker compose up -d mysql`
3. For persistent login sessions, set a private JWT signing secret of at least 32 bytes in the API terminal. In PowerShell, use `$env:JWT_SECRET="replace-this-with-a-long-random-private-value"`. When omitted during local development, the API generates a secure temporary key and invalidates sessions on restart.
4. Optionally set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the API terminal to create, promote, or reset the bootstrap administrator. In PowerShell, use `$env:ADMIN_EMAIL="admin@example.com"` and `$env:ADMIN_PASSWORD="change-me"`.
5. Start the API: `cd backend` then `./mvnw spring-boot:run` (Windows: `.\mvnw.cmd spring-boot:run`).
6. Start the UI: `cd frontend`, run `npm install`, then `npm run dev`.
7. Open `http://localhost:3000`.

The API defaults to `http://localhost:8080/api/v1`. Override it with `NEXT_PUBLIC_API_URL`. Uploaded restaurant and dish images are stored in the API working directory's `uploads` folder (`backend/uploads` when started as shown above); set `UPLOAD_DIR` before starting the API to use a different directory.

## REST API

- `GET /api/v1/health`
- `GET /api/v1/restaurants`
- `GET /api/v1/restaurants/top-rated`
- `GET /api/v1/restaurants/{slug}`
- `GET /api/v1/dishes?restaurant={slug}`
- `GET /api/v1/dishes/{slug}`
- `GET /api/v1/reviews?restaurant={slug}`
- `POST /api/v1/reviews`
- `DELETE /api/v1/reviews/{id}` (review owner only)
- `GET /api/v1/reviews/mine`
- `GET /api/v1/users/me`
- `GET|POST|DELETE /api/v1/users/me/saved-restaurants/**`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/admin/dashboard`
- `POST /api/v1/admin/images` (JPEG, PNG or GIF; maximum 5 MB)
- `GET|POST|PUT|DELETE /api/v1/admin/restaurants/**`
- `GET|POST|PUT|DELETE /api/v1/admin/dishes/**`
- `GET|PATCH /api/v1/admin/reviews/**`

Customer routes include `/restaurants`, `/restaurants/[slug]`, `/dishes/[slug]`, `/reviews/new`, `/login`, `/signup`, and `/profile`. Administration routes live under `/admin`.

## Unicode and localization

The MySQL server, database, tables, API encoding and frontend fonts are configured for English, Sinhala and Tamil. MySQL uses `utf8mb4` with `utf8mb4_0900_ai_ci`; Connector/J derives UTF-8 from the server configuration rather than relying on legacy `utf8` settings.

## Project layout

```text
frontend/   Next.js application
backend/    Spring Boot REST API
database/   Versioned MySQL schema and seed data
docs/       Project records
```
