# Session authentication with MySQL, split into layers

The same example as [express-session-html-mysql](../express-session-html-mysql/): the same routes and HTML pages. The difference is the structure. There, everything is in `server.js`. Here, the code is split into controller, service and repository layers.

## Layers

A request travels down through the layers, and each one calls only the next:

```text
routes         connect a URL to middleware and a controller
  controllers  read req, call a service, use the session, send res
    services   business rules: duplicates, password hashing and checks
      repositories  database queries through Drizzle
```

| Layer | Knows about | Must not know about |
|-------|-------------|---------------------|
| Controller | `req`, `res`, the session | SQL, password hashing |
| Service | business rules | `req`, `res`, the session, SQL |
| Repository | the database | HTTP, business rules |

Errors travel back up. A service throws an error such as `InvalidCredentialsError`, and the `errorHandler` middleware turns it into a response.

## What else differs from the simple example

- **Drizzle ORM:** tables are described in `src/db/schema.js`, and migrations are generated from that file.
- **Sessions are stored in MySQL:** they survive a server restart. See `src/sessions/mysqlSessionStore.js`.
- **Validation:** `zod` checks the request body, including that `username` and `password` are strings.
- **Stronger passwords:** bcrypt uses 12 rounds, and a password needs at least 8 characters.
- **Session fixation protection:** the session id changes on login.
- **Login attempt limit:** 10 failed attempts per IP in 15 minutes, then the server responds with 429. Counters are kept in memory, so they reset on restart and are not shared between servers.
- **Same login time for unknown users:** the password is always checked with bcrypt, so response time does not reveal whether a username exists.

## Before using this in production

- Set Express `trust proxy` when running behind a reverse proxy. Without it, `secure` cookies are not sent and all clients count as one IP for the login limit.
- Use a shared store such as Redis for the login limit if you run more than one server.
- Registration still reveals taken usernames, because it says so directly. Hiding that requires a different flow, such as email confirmation.

## How to start

```bash
npm i
cp .env.example .env   # then fill in the values
npm run db:init        # creates the database and the user
npm run db:migrate     # creates the tables
npm run start
```

## Other commands

```bash
npm test               # unit tests, no database needed
npm run lint
npm run db:generate    # creates a migration after you change src/db/schema.js
```
