import { z } from 'zod';

export const balanceSchema = z.number().positive();

export const accountSchema = z.object({
  IBAN: z.string().min(22),
  balances: z.object({
    available: z.object({
      value: balanceSchema,
      currency: z.string().length(3),
    }),
  }),
  country: z.string().length(3),
  createdAt: z.string(),
  id: z.string().uuid(),
  name: z.string(),
});
