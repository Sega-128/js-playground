# Session authentication with MySQL, split into layers

The same routes and HTML pages as [express-session-html-mysql](../express-session-html-mysql/), but the code is split into layers.

```text
src/
  routes/         URL to controller
  controllers/    req, res and the session
  services/       business rules
  repositories/   database queries
```

- Express, express-session with sessions stored in MySQL
- Drizzle ORM with migrations
- zod validation, bcrypt for passwords
- routes:
  - register (POST)
  - login (POST)
  - profile (GET)
  - logout (POST)

## How to start

```bash
npm i
cp .env.example .env   # fill in the values
npm run db:init        # creates the database and the user
npm run db:migrate     # creates the tables
npm run start
```

## Other commands

```bash
npm test               # unit tests, no database needed
npm run lint
npm run db:generate    # new migration after changing src/db/schema.js
```
