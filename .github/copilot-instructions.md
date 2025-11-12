## Copilot / AI contributor instructions (concise)

Purpose: help an AI agent be productive immediately — where code lives, app shape, conventions, and concrete examples.

- Entry point & dev/start: `src/server.ts` is the runtime entry (uses `express`, Socket.IO, and `app.set('io', io)` so controllers may emit). Use `npm run dev` (uses `ts-node-dev`) to run locally; `npm run build` then `npm start` for production.

- Key directories:
  - `src/controllers/` — request handlers (functions exported and used directly from routes). Example: `src/controllers/authController.ts` exposes `register` and `login` used by `src/routes/authRoutes.ts`.
  - `src/routes/` — create `express.Router()` and mount controller functions. All routes are mounted in `src/server.ts` under `/api/*`.
  - `src/middleware/` — express middleware (e.g. `authMiddleware.ts` verifies JWT, loads user and attaches `(req as any).user`). Use `authMiddleware` on team/project/task routes.
  - `src/models/` — Mongoose models (e.g. `User.ts` includes `teams` array and a `comparePassword` method). Keep DB schema changes here.
  - `src/dto/` — DTOs with `class-validator` and `class-transformer` — used together with `validationMiddleware`.
  - `src/socket/` — Socket.IO wiring. `setupRealtimeSockets(io)` authenticates sockets using the same JWT secret and joins users to `team_<id>` rooms.

- Environment/config: `src/config.ts` reads `.env` keys: `MONGO_URI`, `JWT_SECRET`, `PORT`. Controllers and socket auth rely on `config.jwtSecret`.

- Types and TS quirks (important):
  - `tsconfig.json` intentionally sets `typeRoots` and `types`. If you add or see missing-ambient-type errors (TS7016) for packages such as `express`, add the package’s types to the `types` array (e.g. `"types": ["node", "express"]`) or install `@types/<pkg>`.
  - Example fix already present: `tsconfig.json` includes `"types": ["node", "express"]` so TS resolves `@types/express`.

- Dependency & script hints:
  - `package.json` scripts: `dev` (ts-node-dev), `build` (tsc), `start` (node dist/server.js), `test` (jest).
  - If a TypeScript error complains about missing declarations for a module, ensure `@types/<module>` is in devDependencies and run `npm ci` / `npm install`.

- Patterns to follow when adding endpoints:
  1. Add DTO in `src/dto/` and validation rules when request body needs checking.
  2. Add controller in `src/controllers/` exporting plain functions (req,res). Prefer async/await and central error responses (controller currently returns JSON `{ msg: '...' }`).
  3. Hook route into `src/routes/` using Router and mount in `src/server.ts`. Protect with `authMiddleware` when the route requires authentication.

- Socket notes (concrete):
  - Socket auth expects token in `socket.handshake.query.auth_token` or `socket.handshake.auth.token`.
  - After auth, code joins the user to `team_<teamId>` rooms. Emitting to a team: `io.to('team_'+teamId).emit('event', payload)`;
  - `server.ts` attaches `io` to `app` via `app.set('io', io)` so other modules (if needed) can access sockets via `const io = req.app.get('io')`.

- Testing & debugging:
  - Run `npm run test` (Jest). For development, `npm run dev` for hot-reload.
  - For TypeScript build issues, run `npm run build` and inspect tsc messages. If you see TS7016 for a library, verify `@types/<lib>` and `tsconfig.json.types`.

- Where to look for examples in repo:
  - Auth route: `src/routes/authRoutes.ts` + `src/controllers/authController.ts` (register/login flow).
  - Auth middleware: `src/middleware/authMiddleware.ts` (JWT verify, attach user).
  - Socket setup: `src/socket/index.ts` and `src/server.ts` for `app.set('io', io)` usage.

If anything here is missing or unclear (for example a new custom convention you expect the agent to follow), tell me which area to expand and I will update this file.
