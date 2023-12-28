import { Hono } from 'hono';

import { InvalidZodError } from '@/utils/ApiError';

import { getAccounts, getBalance, transfer } from './account.controller';
import { accountFilterSchema, TransferCreate, transferCreateSchema } from './account.schema';

export const accountRouter = new Hono();

/** List all accounts */
accountRouter.get('/', async (c) => {
  const safeQuery = accountFilterSchema.safeParse(c.req.query());

  if (!safeQuery.success) {
    throw new InvalidZodError(safeQuery.error);
  }

  const accounts = await getAccounts(safeQuery.data);
  return c.json(accounts);
});

/** Update account balance */
accountRouter.put('/:id/transfer', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<TransferCreate>();
  const parsed = transferCreateSchema.parse(body);
  const account = await transfer(id, parsed);
  return c.json(account);
});

/** Get balance */
accountRouter.get('/balance', async (c) => {
  const balance = await getBalance();
  return c.json(balance);
});
