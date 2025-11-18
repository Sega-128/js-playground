# A simple server with sessions and an example of authentication. 
# Data is stored in a mysql, many things are simplified.

- Create HTML with login/register page and profile
- Express for server and static html file
- Minimal setup: Express, dev logging, env, ESLint, cors, hash for password, middleware.
- express-session (example: save session in memory)
- routes:
  - login (POST)
  - register (POST)
  - profile (GET)
  - logout (POST)
- Save user in mysql

# How to start ?
```bash
  npm i
  fill in .env file
  node initDB.js // Optional, if you want create db and table, modify
  npm run start
```