import { Hono } from 'hono';
import { getAccounts, getBalance, updateBalance } from './account.controller';
import { accountFilterSchema } from './account.schema';

export const accountRouter = new Hono();

/** List all accounts */
accountRouter.get('/', async (c) => {
  const query = c.req.query();
  const safeQuery = accountFilterSchema.parse(query);
  const accounts = await getAccounts(safeQuery);
  return c.json(accounts);
});

/** Update account balance */
accountRouter.put('/:id/balance', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<{ balance: number }>();
  const account = await updateBalance(id, body.balance);
  return c.json(account);
});

/** Get balance */
accountRouter.get('/balance', async (c) => {
  const balance = await getBalance();
  return c.json(balance);
});
