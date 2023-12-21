import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { accountRouter } from '@/account/account.route';
import { transferRouter } from '@/transfer/transfer.route';

const app = new Hono();

/** Middlewares */
app.use('*', logger());
app.use('*', cors());

/** Routers */
app.route('/account', accountRouter);
app.route('/transfer', transferRouter);

/** Root endpoint */
app.get('/', (c) => c.text('Pile Capital coding challenge API'));

/** Error handler */
app.onError((err, c) => {
  // Logging and monitoring tools can be used here.
  return c.json({ error: 'Internal server error' }, 500);
});

serve(app, ({ port }) => {
  console.log(`Server is running on port ${port}, http://localhost:${port}`);
});
