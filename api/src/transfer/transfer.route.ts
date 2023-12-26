import { Hono } from 'hono';

import { createTransfer } from './transfer.controller';
import { TransferCreate } from './transfer.schema';

export const transferRouter = new Hono();

transferRouter.post('/', async (c) => {
  const body = await c.req.json<TransferCreate>();
  const transfer = await createTransfer(body);
  return c.json(transfer, 201);
});
