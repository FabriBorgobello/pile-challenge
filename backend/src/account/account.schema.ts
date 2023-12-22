import { z } from 'zod';

export const balanceSchema = z.number().positive();

export const accountSchema = z.object({
  IBAN: z.string().length(22),
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
  minBalance: z.coerce.number().positive().optional(),
  maxBalance: z.coerce.number().positive().optional(),
});

export type AccountFilter = z.infer<typeof accountFilterSchema>;
export type Account = z.infer<typeof accountSchema>;
