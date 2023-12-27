# Pile Capital coding challenge

## Overview

This project is a coding challenge created by Fabricio Borgobello for Pile Capital.

## Structure

This coding challenge is organized as an NPM workspace containing three independent packages: `web`, `api`, and `e2e`. Each of these packages is self-contained and does not share code with the others. To interact with the application, each package should be initialized individually. This structure ensures modularity and separation of concerns, allowing for focused development and testing in each aspect of the application.

## Tech Stack

### Frontend

- Framework: Vite + React + TypeScript
- Styling: TailwindCSS
- Form Handling: React Hook Form
- Data Fetching: TanStack Query
- Validation: Zod

### Backend

- Server: Node.js with Hono.dev + TypeScript
- Bundler: esbuild

### E2E Tests

- Testing Framework: Playwright

## Initialization

To get started, follow these steps:

1. Install dependencies with `npm install`.
2. Run `npm run dev:web` to start the frontend application.
3. In a separate terminal, run `npm run dev:api` to start the backend server.

## Testing:

There are two options for running end-to-end tests:

- For headless testing, run:
  `npm run test`
- To use Playwright with visual support, use
  `npm run test:ui`

  > NOTE: For the purposes of this coding challenge, the e2e tests are configured to run against the local development server. This should not be the case in a real-world scenario, where the tests should be run against a staging or production environment.

## Environment Variables

The following environment variables are required for the application to run:

- `VITE_API_BASE_URL`: The URL of the backend server. Defaults to `http://localhost:3000`.

- `VITE_E2E`: A boolean flag indicating whether the application is running in e2e mode. (e.g. to avoid retrying failed requests).

For convenience. Both of these variables are already set in the `.env` file at the root of the web package. This file SHOULD NOT be committed to source control and is only provided for convenience.
