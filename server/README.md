# URL Shortener (Server)

### Prerequisites

- Make sure to create an `.env` file using `.env.example` as reference for the required environment variables.
- Make sure the database URI starts with `postgresql://`, if not change the config to fit your needs. File at `/server/src/config/env.ts`
-

## Getting Started

To run the fastify backend application locally, follow the following steps:

1. Install the dependencies:

```
npm install
```

2. Generate migration for the database schema:

```
npm run db:generate
```

3. Push the migration to the database:

```
npm run db:migrate
```

4. To run the application:

```
npm run dev
```

or

4. Build the application

```
npm run build
```

5. Run the built application

```
npm run start
```

## Optional

To run the dockerized application with multiple instances and a load balancer in front.

1. Create a file `run.sh` at the root of the server directory.

2. Include the following in the file:

```
docker compose down

export DATABASE_URI={{Your Database URI}}
export JWT_SECRET_KEY={{JWT Secret}}
export CORS_ORIGIN={{Client URL}}


docker compose up -d --build
```

3. Give it execution permissions.

4. Run the file start the docker compose in detached mode

## Tech Stack

- Backend Web Frameword - `Fastify`
  - Plugins used:
    - CORS - `@fastify/cors`
    - Security Headers - `@fastify/helmet`
    - Authentication (Token-based) - `"@fastify/jwt`
    - Rate-Limiting - `@fastify/rate-limit`
- Data Validations - `Zod`
- ORM - `drizzle-orm`
- Database - `Postgres`
