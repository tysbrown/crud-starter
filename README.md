# CRUD Starter
Set up as a monorepo:

#### /api
Back-end running Express, Apollo Server/GraphQL, Prisma, and Jest.

#### /ui
Front-end running React, React Query, Tailwind, Jest, and React Testing Library.

# Setup Local Environment
* If you don't already have it, [download Docker.](https://docs.docker.com/get-docker/)
* Run `npm i` in both /api and /ui directories.
* Navigate to /api:
  * In `docker-compose.yml` change POSTGRES_USER and POSTGRES_PASSWORD to whichever values you want
  * Run `docker-compose up -d` to spin up the PostgreSQL database using Docker.
  * Create an `.env` file, paste the variable `DATABASE_URL="postgresql://enterpostgresuserhere:enterpostgrespasswordhere@localhost:5432/mydb?schema=public"`
  * Run `npm run dev` to start the API.
* Navigate to /ui:
  * Run `npm run dev` to start the UI.
