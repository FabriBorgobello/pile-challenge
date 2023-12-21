import { Hono } from 'hono';

export const accountRouter = new Hono();

accountRouter.get('/', async (c) => {
  return c.json({ message: 'Not implemented' }, 501);
});
accountRouter.get('/:id', async (c) => {
  return c.json({ message: 'Not implemented' }, 501);
});
accountRouter.post('/', async (c) => {
  return c.json({ message: 'Not implemented' }, 501);
});
accountRouter.put('/:id', async (c) => {
  return c.json({ message: 'Not implemented' }, 501);
});
accountRouter.delete('/:id', async (c) => {
  return c.json({ message: 'Not implemented' }, 501);
});
