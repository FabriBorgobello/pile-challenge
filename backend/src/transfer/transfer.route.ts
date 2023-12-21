import { Hono } from 'hono';

export const transferRouter = new Hono();

transferRouter.get('/', async (c) => {
  return c.json({ message: 'Not implemented' }, 501);
});
transferRouter.get('/:id', async (c) => {
  return c.json({ message: 'Not implemented' }, 501);
});
transferRouter.post('/', async (c) => {
  return c.json({ message: 'Not implemented' }, 501);
});
transferRouter.put('/:id', async (c) => {
  return c.json({ message: 'Not implemented' }, 501);
});
transferRouter.delete('/:id', async (c) => {
  return c.json({ message: 'Not implemented' }, 501);
});
