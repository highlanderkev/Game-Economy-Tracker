# Game Economy Tracker

Game Economy Tracker helps compare the real-world cost of in-game currency across games and purchase packs. Add games, currencies, and packs to see cost-per-unit values and identify the best-value pack for each currency.

## Features

- Track games and their in-game currencies.
- Record currency purchase packs with real-world prices and amounts.
- Compare best, worst, and average cost per currency unit.
- Search games and review dashboard totals and value summaries.
- Use the interface in dark or light theme.

## Tech stack

- React, TypeScript, Vite, Tailwind CSS, and shadcn/ui components
- Express API with Zod validation
- Drizzle ORM and PostgreSQL schema definitions

## Getting started

Requirements: Node.js 20 or later and npm.

```sh
npm install
npm run dev
```

Open [http://localhost:5000](http://localhost:5000). The development server serves both the web app and API. Set `PORT` to use a different port.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run check` | Run the TypeScript type check |
| `npm run build` | Build the client and server for production |
| `npm start` | Start the production build |
| `npm run db:push` | Push the Drizzle schema to the configured PostgreSQL database |

## Data storage

The current server uses in-memory storage, so games, currencies, and purchase packs are cleared when the server restarts. The repository includes a PostgreSQL schema and Drizzle configuration, but the application storage layer is not yet connected to that database. `npm run db:push` requires `DATABASE_URL`.

## API

The Express server exposes these JSON endpoints:

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/games` | List games with their currencies and purchase packs |
| `GET`, `PUT`, `DELETE` | `/api/games/:id` | Read, update, or delete a game |
| `POST` | `/api/games` | Create a game |
| `GET` | `/api/games/:gameId/currencies` | List a game's currencies |
| `POST` | `/api/currencies` | Create a currency |
| `PUT`, `DELETE` | `/api/currencies/:id` | Update or delete a currency |
| `GET` | `/api/currencies/:currencyId/packs` | List a currency's purchase packs |
| `POST` | `/api/purchase-packs` | Create a purchase pack |
| `PUT`, `DELETE` | `/api/purchase-packs/:id` | Update or delete a purchase pack |
