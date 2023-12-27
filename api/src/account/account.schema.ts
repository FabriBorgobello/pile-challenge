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

export const accountFilterSchema = z.object({
  minBalance: z.coerce.number().default(0),
  maxBalance: z.coerce.number().default(Number.MAX_SAFE_INTEGER),
  limit: z.coerce.number().default(10),
  offset: z.coerce.number().default(0),
});

export type AccountFilter = z.infer<typeof accountFilterSchema>;
export type Account = z.infer<typeof accountSchema>;
