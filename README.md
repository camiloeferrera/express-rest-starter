# Express REST Starter

This is a starter project for a REST API with Express.js, TypeScript, and PostgreSQL.

**Note:** The `sqlserver` branch is adapted to use SQL Server instead of PostgreSQL.

Documentation available in:

- [Español](README.es.md)

## Prerequisites

- Node.js (version 18 or higher)
- pnpm
- PostgreSQL

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd express-rest-starter
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit the `.env` file with your values:
     ```
     PORT=443
     DB_SERVER=your-postgresql-server
     DB_PORT=5432
     DB_NAME=your-database
     DB_USER=your-user
     DB_PASSWORD=your-password
     JWT_SECRET=your-jwt-secret
     ```

## Development

To run the project in development mode:

```bash
pnpm run dev
```

This will start the server with automatic reloading using `tsx watch`.

## Production

1. Build the project:

   ```bash
   pnpm run build
   ```

2. Install PM2 globally (if you don't have it):

   ```bash
   npm install -g pm2
   ```

3. Start the application with PM2:

   ```bash
   pnpm run start
   ```

   Or directly:

   ```bash
   pm2 start dist/server.js --name express-rest-starter
   ```

   To start in production with automatic build:

   ```bash
   pnpm run start:prod
   ```

## Available Scripts

- `pnpm run dev`: Runs in development mode with automatic reloading.
- `pnpm run build`: Compiles TypeScript to JavaScript.
- `pnpm run start`: Starts the application with PM2.
- `pnpm run start:prod`: Builds and starts in production.

## Project Structure

- `src/app.ts`: Main Express configuration.
- `src/server.ts`: Server entry point.
- `src/certs/`: SSL certificates for the domain.
- `src/config/env.ts`: Environment variables configuration.
- `src/controllers/`: API controllers.
- `src/database/connection.ts`: Database connection.
- `src/middlewares/`: Custom middlewares.
- `src/models/`: Data models.
- `src/routes/`: Route definitions.
- `src/utils/`: Utilities.

## License

ISC
