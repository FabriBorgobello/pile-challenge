import { z } from 'zod';

export const accountSchema = z.object({
  IBAN: z.string().min(22),
  balances: z.object({
    available: z.object({
      value: z.number(),
      currency: z.string().length(3),
    }),
  }),
  country: z.string().length(3),
  createdAt: z.string(),
  id: z.string(),
  name: z.string(),
});

export const accountInsertSchema = accountSchema.omit({
  id: true,
  createdAt: true,
});

export const accountUpdateSchema = accountInsertSchema.partial();
