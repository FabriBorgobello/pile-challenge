import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { accountRouter } from '@/account/account.route';
import { ApiError } from '@/utils/ApiError';

const app = new Hono();

/** Middlewares */
app.use('*', logger());
app.use('*', cors());

/** Routers */
app.route('/account', accountRouter);

/** Root endpoint */
app.get('/', (c) => c.text('Pile Capital coding challenge API'));

/** Error handler */
app.onError((err, c) => {
  // API error
  if (err instanceof ApiError) {
    return c.json({ error: err.message }, err.statusCode);
  }
  // Unknown errors
  return c.json({ error: 'Internal server error' }, 500);
});

serve(app, ({ port }) => {
  console.log(`Server is running on port ${port}, http://localhost:${port}`);
});
