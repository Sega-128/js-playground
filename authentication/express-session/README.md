# A simple server with sessions and an example of authentication. 
# Data is stored in a file, many things are simplified.

- Create HTML with login/register page and profile
- Express for server and static html file
- Minimal setup: Express, dev logging, env, ESLint, cors, hash for password.
- express-session (example: save session in memory)
- routes:
  - login (POST)
  - register (POST)
  - profile (GET)
  - logout (POST)
- Save user in JSON file `user.json`