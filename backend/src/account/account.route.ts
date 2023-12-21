import { Hono } from 'hono';
import { getAccounts, updateBalance } from './account.controller';

export const accountRouter = new Hono();

/** List all accounts */
accountRouter.get('/', async (c) => {
  const accounts = await getAccounts();
  return c.json(accounts);
});

/** Update account balance */
accountRouter.put('/:id/balance', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<{ balance: number }>();
  const account = await updateBalance(id, body.balance);
  return c.json(account);
});
