# Sam's Podcast App: A toy app for learning sveltekit and fastify

## Running locally

Prerequisites:
1. Install [Caddy Server](https://caddyserver.com) (e.g. `brew install caddy`)
2. Have node and npm. I'm currently using node@16.11

Start:
1. From project root - run `caddy start` (or `caddy run` if you want to see the
   logs)
2. From `sams-podcast-app/server`, directory, run `npm start`
3. From `sams-podcast-app/client`, run `npm run dev`

## Notes
Caddy is proxying requests from `https://localhost/api/*` to
`http://localhost:4000` and requests from anything that doesn't start with
`/api` to `http://localhost:3000`. As a part of that, it is stripping the `/api`
part of the uri.
